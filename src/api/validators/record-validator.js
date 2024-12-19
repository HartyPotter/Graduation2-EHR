import Joi from 'joi';

export function validateCondition(body) {
  const conditionSchema = Joi.object({
    patient_id: Joi.string().required(),
    condition_name: Joi.string().required(),
    severity: Joi.number().min(0).max(10).required(),
    diagnosis: Joi.string().allow(null, ''),
    details: Joi.string().allow(null, ''),
    treated: Joi.boolean().required(),
    });

    return conditionSchema.validate(body);
}

export function validateMedication(body) {
  const medicationSchema = Joi.object({
    patient_id: Joi.string().required(),
    prescribed_by: Joi.string().required(),
    medication_name: Joi.string().required(),
    condition: Joi.string().required(),
    frequency: Joi.string().required(),
    dosage: Joi.string().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    });

    return medicationSchema.validate(body);
}

export function validateImmunization(body) {
  const immunizationSchema = Joi.object({
    patient_id: Joi.string().required(),
    administered_by: Joi.string().required(),
    vaccine_name: Joi.string().required(),
    date_administered: Joi.date().required(),
    });

    return immunizationSchema.validate(body);
}

export function validateSurgery(body) {
  const procedureSchema = Joi.object({
    patient_id: Joi.string().required(),
    surgeon_id: Joi.string().required(),
    procedure: Joi.string().required(),
    scheduled_date: Joi.date().required(),
    date_performed: Joi.date().required(),
    details: Joi.string().required(),
    });

    return procedureSchema.validate(body);
}

export function validateTest(body) {
  const testSchema = Joi.object({
    patient_id: Joi.string().required(),
    ordered_by: Joi.string().required(),
    test_name: Joi.string().required(),
    date_ordered: Joi.string().required(),
    });

    return testSchema.validate(body);
}

export function validateVital(body) {
  const vitalSchema = Joi.object({
    patient_id: Joi.string().required(),
    recorded_by: Joi.string().required(),
    vital_name: Joi.string().required(),
    value: Joi.number().required(),
    unit: Joi.string().required(),
    recorded_at: Joi.string().required(),
    });

    return vitalSchema.validate(body);
}

export function validateVisit(body) {
  const visitSchema = Joi.object({
    patient_id: Joi.string().required(),
    doctor_id: Joi.string().required(),
    visit_type: Joi.string().required(),
    location: Joi.string().required(),
    visit_date: Joi.date().required(),
    reason: Joi.string().allow(null, ''),
    notes: Joi.string().allow(null, ''),
    report_id: Joi.string().allow(null, ''),
    });

    return visitSchema.validate(body);
}

export function validateAllergy(body) {
  const allergySchema = Joi.object({
    patient_id: Joi.string().required(),
    diagnosed_by: Joi.string().required(),
    allergy: Joi.string().required(),
    diagnosis_date: Joi.string().allow(null, ''), // Optional field
    severity: Joi.number().min(0).max(10).required(),
    });

    return allergySchema.validate(body);
  }