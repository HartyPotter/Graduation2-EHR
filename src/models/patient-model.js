import { DataTypes, Model } from 'sequelize';
import sequelize from '../loaders/postgres-loader.js';

class Patient extends Model {}

Patient.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'),
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    national_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    photo_url: {
      type: DataTypes.STRING,
      defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png',
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    insurance_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Patient',
    tableName: 'patients',
    timestamps: true,
    underscored: true,
  }
);

export default Patient;

/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - full_name
 *         - password
 *         - birth_date
 *         - address
 *         - national_id
 *         - phone_number
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the patient.
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the patient.
 *         full_name:
 *           type: string
 *           description: Full name of the patient.
 *         password:
 *           type: string
 *           format: password
 *           description: Password for the patient account.
 *         gender:
 *           type: string
 *           enum: [male, female]
 *           description: Gender of the patient.
 *         birth_date:
 *           type: string
 *           format: date
 *           description: Birth date of the patient.
 *         address:
 *           type: string
 *           description: Residential address of the patient.
 *         national_id:
 *           type: string
 *           description: National identification number of the patient.
 *         photo_url:
 *           type: string
 *           format: uri
 *           description: URL to the patient’s profile photo.
 *         is_verified:
 *           type: boolean
 *           default: false
 *           description: Indicates whether the patient’s email is verified.
 *         insurance_number:
 *           type: string
 *           description: Insurance number of the patient (optional).
 *         phone_number:
 *           type: string
 *           description: Contact phone number of the patient.
 */