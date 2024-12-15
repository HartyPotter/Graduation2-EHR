import { DataTypes } from 'sequelize';
import sequelize from '../loaders/postgres-loader.js';

const PatientContact = sequelize.define(
  'patient_contacts',
  {
    patient_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Patients',
        key: 'id',
      },
      primaryKey: true,
      onDelete: 'CASCADE',
    },
    contact_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Contacts',
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
