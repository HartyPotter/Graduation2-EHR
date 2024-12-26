import mongoose from 'mongoose';

const { Schema } = mongoose;

const medicalRecordSchema = new Schema({
  patient_id: {
    type: String, // External ID from PostgreSQL
    required: true,
    unique: true,
  },
  medical_conditions: [{
    type: Schema.Types.ObjectId,
    ref: 'Condition',
  }],
  allergies: [{
    type: Schema.Types.ObjectId,
    ref: 'Allergy',
  }],
  medications: [{
    type: Schema.Types.ObjectId,
    ref: 'Medication',
  }],
  surgeries: [{
    type: Schema.Types.ObjectId,
    ref: 'Surgery',
  }],
  visits: [{
    type: Schema.Types.ObjectId,
    ref: 'Visit',
  }],
  blood_type: String,
  weight: Number,
  height: Number,
  lifestyle: {
    type: Schema.Types.ObjectId,
    ref: 'Lifestyle',
  },
}, {
  timestamps: true,
  versionKey: 'version',
});

// Indexes
// medicalRecordSchema.index({ patient_id: 1 });
medicalRecordSchema.index({ createdAt: 1 });
medicalRecordSchema.index({ updatedAt: 1 });

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
export default MedicalRecord;
