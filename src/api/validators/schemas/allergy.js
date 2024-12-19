import Joi from 'joi';

export const createAllergySchema = Joi.object({
  medical_record_id: Joi.string().required(),
  allergen_name: Joi.string().required(),
  allergen_type: Joi.string().required().valid(
    'Food',
    'Drug',
    'Environmental',
    'Insect',
    'Latex',
    'Other'
  ),
  reaction: Joi.string().required(),
  severity: Joi.string().required().valid(
    'Mild',
    'Moderate',
    'Severe',
    'Life-threatening'
  ),
  diagnosis_date: Joi.date().iso().max('now'),
  onset_date: Joi.date().iso().max('now'),
  treatment_plan: Joi.string(),
  emergency_instructions: Joi.string(),
  medications_to_avoid: Joi.array().items(Joi.string())
});
