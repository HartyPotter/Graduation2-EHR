import Joi from 'joi';

export const createRecordSchema = Joi.object({
  patient_id: Joi.string().required(),
  blood_type: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
  weight: Joi.number().min(0).max(500),
  height: Joi.number().min(0).max(300)
});
