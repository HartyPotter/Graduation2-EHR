import Joi from 'joi';

export const createConditionSchema = {
  body:{
    medical_record_id: Joi.string().required(),
    condition_name: Joi.string().required(),
    diagnosis_date: Joi.date().iso().max('now'),
    status: Joi.string().required().valid(
      'Active',
      'Resolved',
      'Recurrent',
      'Inactive'
    ),
    notes: Joi.string(),
    severity: Joi.string().valid(
      'Mild',
      'Moderate',
      'Severe',
      'Life-threatening'
    ),
    treatment_plan: Joi.string(),
    expected_duration: Joi.string()
  }
}
