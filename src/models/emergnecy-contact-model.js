import { DataTypes, Model } from 'sequelize';
import sequelize from '../loaders/postgres-loader.js';

class Contact extends Model {}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contact_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'),
      allowNull: false,
    },
    relation_to_patient: {
      type: DataTypes.ENUM(
        "Mother",
        "Father",
        "Sibling",
        "Son",
        "Daughter",
        "Spouse",
        "Friend",
        "Family Member"
      ),
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
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Contact',
    tableName: 'contacts',
    timestamps: true,
    underscored: true,
  }
);

export default Contact;

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - id
 *         - contact_name
 *         - email
 *         - gender
 *         - relation_to_patient
 *         - address
 *         - national_id
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the contact.
 *         contact_name:
 *           type: string
 *           description: Full name of the contact.
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the contact.
 *         gender:
 *           type: string
 *           enum: [male, female]
 *           description: Gender of the contact.
 *         relation_to_patient:
 *           type: string
 *           enum: [Mother, Father, Sibling, Son, Daughter, Spouse, Friend, Family Member]
 *           description: Relationship of the contact to the patient.
 *         address:
 *           type: string
 *           description: Residential address of the contact.
 *         national_id:
 *           type: string
 *           description: National identification number of the contact.
 *         phone_number:
 *           type: string
 *           description: Contact phone number of the contact (optional).
 */
