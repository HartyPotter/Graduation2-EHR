import { Condition, MedicalRecord } from '../../../models/models-index.js';
import { sendSuccess, asyncHandler } from '../../../utils/response-handler.js';
import { createAuditLog } from '../../../utils/audit-logger.js';
import { NotFoundError, ValidationError } from '../../../utils/errors.js';
import { validate } from '../../validators/validator.js';
import { createConditionSchema } from '../../validators/schemas/index.js';

export default [
  validate(createConditionSchema),
  asyncHandler(async (req, res) => {
    const {
      medical_record_id,
      condition_name,
      diagnosis_date,
      status,
      notes,
      severity,
      treatment_plan,
      expected_duration,
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

    const condition = new Condition({
      medical_record_id,
      condition_name,
      diagnosis_date,
      status,
      notes,
      diagnosing_doctor_id: doctor_id,
      severity,
      treatment_plan,
      expected_duration,
    });

    const savedCondition = await condition.save();

    // Update medical record with the new condition
    await MedicalRecord.findByIdAndUpdate(
      medical_record_id,
      { $push: { medical_conditions: savedCondition._id } }
    );

    await createAuditLog({
      medical_record_id,
      collection_name: 'conditions',
      document_id: savedCondition._id,
      action: 'CREATE',
      changes: {
        after: savedCondition.toObject(),
      },
      doctor_id,
      reason: `New condition diagnosed: ${condition_name}`,
      req,
    });

    return sendSuccess(res, savedCondition, 'Medical condition added successfully', 201);
  }),
];
