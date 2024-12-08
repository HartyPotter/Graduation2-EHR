import { DataTypes, Model } from 'sequelize';
import sequelize from '../loaders/postgres-loader.js';

class User extends Model {}

User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    role: {
      type: DataTypes.ENUM('patient', 'admin', 'doctor'),
      defaultValue: 'patient',
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
    is_activated: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users', // Explicitly define the table name
    timestamps: true, // Enables automatic createdAt/updatedAt
    underscored: true, // Uses snake_case for column names
  });

  export default User;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - full_name
 *         - password
 *         - birth_date
 *         - address
 *         - national_id
 *         - is_verified
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the user.
 *           example: 1
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address.
 *           example: "johndoe@example.com"
 *         full_name:
 *           type: string
 *           description: The full name of the user.
 *           example: "John Doe"
 *         password:
 *           type: string
 *           description: The user's password (hashed).
 *           example: "$2b$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
 *         role:
 *           type: string
 *           enum: [patient, admin, doctor]
 *           description: The role of the user.
 *           example: "patient"
 *         gender:
 *           type: string
 *           enum: [male, female]
 *           description: The gender of the user.
 *           example: "male"
 *         birth_date:
 *           type: string
 *           format: date
 *           description: The birth date of the user.
 *           example: "1990-01-01"
 *         address:
 *           type: string
 *           description: The user's home address.
 *           example: "123 Main Street, City, Country"
 *         national_id:
 *           type: string
 *           description: The national ID of the user.
 *           example: "AB1234567"
 *         photo_url:
 *           type: string
 *           description: The URL of the user's photo.
 *           example: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png"
 *         is_activated:
 *           type: boolean
 *           description: Whether the user's account is activated.
 *           example: true
 *         is_verified:
 *           type: boolean
 *           description: Whether the user's email is verified.
 *           example: false
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           description: The date when the user was deleted, if applicable.
 *           example: null
 *       example:
 *         id: 1
 *         email: "johndoe@example.com"
 *         full_name: "John Doe"
 *         password: "$2b$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
 *         role: "patient"
 *         gender: "male"
 *         birth_date: "1990-01-01"
 *         address: "123 Main Street, City, Country"
 *         national_id: "AB1234567"
 *         photo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png"
 *         is_activated: true
 *         is_verified: false
 *         deleted_at: null
 */
