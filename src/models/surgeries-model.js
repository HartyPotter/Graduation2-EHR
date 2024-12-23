import mongoose from 'mongoose';

const { Schema } = mongoose;

const surgerySchema = new Schema({
  medical_record_id: {
    type: Schema.Types.ObjectId,
    ref: 'MedicalRecord',
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  procedure_date: {
    type: Date,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  surgeon_id: {
    type: String, // External ID from PostgreSQL
    required: true,
  },
  assistant_surgeon_ids: [String], // External IDs from PostgreSQL
  anesthesiologist_id: String, // External ID from PostgreSQL
  pre_op_diagnosis: String,
  post_op_diagnosis: String,
  complications: [String],
  estimated_blood_loss: String,
  duration: Number, // in minutes
  recovery_notes: String,
  post_op_instructions: String,
  follow_up_date: Date,
  surgical_notes: String,
  pathology_report: String,
  anesthesia_type: String,
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled', 'Postponed'],
    required: true,
  },
  cancellation_reason: String,
  emergency: {
    type: Boolean,
    default: false,
  },
  images: [{
    url: String,
    description: String,
    uploaded_at: Date,
  }],
}, {
  timestamps: true,
  versionKey: 'version',
});

// Indexes
surgerySchema.index({ medical_record_id: 1 });
surgerySchema.index({ surgeon_id: 1 });
surgerySchema.index({ procedure_date: 1 });
surgerySchema.index({ status: 1 });
surgerySchema.index({ createdAt: 1 });

const Surgery = mongoose.model('Surgery', surgerySchema);
export default Surgery;
