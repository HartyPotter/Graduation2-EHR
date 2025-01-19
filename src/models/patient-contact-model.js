import { DataTypes } from 'sequelize';
import sequelize from '../loaders/postgres-loader.js';

const PatientContact = sequelize.define(
  'patient_contacts',
  {
    patient_id: {
      type: DataTypes.STRING,
      references: {
        model: 'patients',
        key: 'id',
      },
      primaryKey: true,
      onDelete: 'CASCADE',
    },
    contact_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'contacts',
        key: 'id',
      },
      primaryKey: true,
      onDelete: 'CASCADE',
    },
    is_emergency_contact: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'patient_contacts',
    timestamps: false,
    underscored: true,
  }
);

export default PatientContact;


/**
 * @swagger
 * components:
 *   schemas:
 *     PatientContact:
 *       type: object
 *       required:
 *         - patient_id
 *         - contact_id
 *       properties:
 *         patient_id:
 *           type: string
 *           description: Unique identifier for the patient.
 *         contact_id:
 *           type: integer
 *           description: Unique identifier for the contact.
 *         is_emergency_contact:
 *           type: boolean
 *           default: true
 *           description: Indicates if the contact is an emergency contact for the patient.
 */
