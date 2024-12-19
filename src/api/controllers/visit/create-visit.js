import { Visit, MedicalRecord } from '../../../models/models-index.js';
import { sendSuccess, asyncHandler } from '../../../utils/response-handler.js';
import { createAuditLog } from '../../../utils/audit-logger.js';
import { NotFoundError, ValidationError } from '../../../utils/errors.js';
import { validate } from '../../validators/validator.js';
import { createVisitSchema } from '../../validators/schemas/index.js';

export default [
  validate(createVisitSchema),
  asyncHandler(async (req, res) => {
    const {
      medical_record_id,
      date,
      visit_type,
      reason,
      complaint,
      symptoms,
      diagnosis,
      treatment_plan,
      medications_prescribed,
      referrals,
      lab_orders,
      imaging_orders,
      facility,
      vitals,
      duration,
      follow_up_needed,
      follow_up_date
    } = req.body;

    const doctor_id = req.body?.doctor_id;
    if (!doctor_id) {
      throw new ValidationError('Doctor ID not provided', { field: 'doctor_id' });
    }

    // Verify medical record exists
    const medicalRecord = await MedicalRecord.findById(medical_record_id);
    if (!medicalRecord) {
      throw new NotFoundError('Medical Record', medical_record_id);
    }

    const visit = new Visit({
      medical_record_id,
      doctor_id,
      date,
      visit_type,
      reason,
      complaint,
      symptoms,
      diagnosis,
      treatment_plan,
      medications_prescribed,
      referrals,
      lab_orders,
      imaging_orders,
      facility,
      vitals,
      duration,
      follow_up_needed,
      follow_up_date,
      status: 'Completed'
    });

    const savedVisit = await visit.save();

    // Update medical record with the new visit
    await MedicalRecord.findByIdAndUpdate(
      medical_record_id,
      { $push: { visits: savedVisit._id } }
    );

    await createAuditLog({
      medical_record_id,
      collection_name: 'visits',
      document_id: savedVisit._id,
      action: 'CREATE',
      changes: {
        after: savedVisit.toObject()
      },
      doctor_id,
      reason: `New visit recorded: ${visit_type} - ${reason}`,
      access_type: visit_type === 'Emergency' ? 'Emergency' : 'Regular',
      req
    });

    return sendSuccess(res, savedVisit, 'Visit recorded successfully', 201);
  })
];
