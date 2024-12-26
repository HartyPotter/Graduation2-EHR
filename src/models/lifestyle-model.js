import mongoose from 'mongoose';

const { Schema } = mongoose;

const lifestyleSchema = new Schema({
  medical_record_id: {
    type: Schema.Types.ObjectId,
    ref: 'MedicalRecord',
    required: true,
  },
  smoker: {
    type: Boolean,
    default: false,
  },
  smoking_details: {
    type: {
      type: String,
      enum: ['Cigarette', 'Cigar', 'Pipe', 'E-cigarette', 'Other'],
    },
    frequency: String,
    years_smoking: Number,
    quit_date: Date,
  },
  alcohol_user: {
    type: Boolean,
    default: false,
  },
  alcohol_details: {
    frequency: String,
    type: [String],
    amount: String,
  },
  drug_user: {
    type: Boolean,
    default: false,
  },
  drug_details: {
    substances: [String],
    frequency: String,
    last_use: Date,
  },
  marital_status: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed', 'Separated', 'Other'],
  },
  occupation: String,
  work_environment_risks: [String],
  physical_activity: {
    frequency: String,
    type: [String],
    duration: Number,
    intensity: {
      type: String,
      enum: ['Light', 'Moderate', 'Vigorous'],
    },
  },
  diet: {
    type: String,
    restrictions: [String],
    allergies: [{
      type: Schema.Types.ObjectId,
      ref: 'Allergy',
    }],
  },
  sleep_pattern: {
    hours_per_night: Number,
    quality: {
      type: String,
      enum: ['Poor', 'Fair', 'Good', 'Excellent'],
    },
    issues: [String],
  },
  stress_level: {
    type: String,
    enum: ['Low', 'Moderate', 'High', 'Severe'],
  },
  sexual_activity: {
    active: Boolean,
    protection_used: Boolean,
    risk_factors: [String],
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
  updated_by_doctor_id: String, // External ID from PostgreSQL
}, {
  timestamps: true,
  versionKey: 'version',
});

// Indexes
lifestyleSchema.index({ medical_record_id: 1 });
lifestyleSchema.index({ updated_by_doctor_id: 1 });
lifestyleSchema.index({ createdAt: 1 });
lifestyleSchema.index({ last_updated: 1 });

const Lifestyle = mongoose.model('Lifestyle', lifestyleSchema);
export default Lifestyle;
