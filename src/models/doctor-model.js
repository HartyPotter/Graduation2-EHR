import { DataTypes, Model } from 'sequelize';
import sequelize from '../loaders/postgres-loader.js';

class Doctor extends Model {}

Doctor.init(
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
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    license_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    years_of_experience: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    educational_background: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    hospital_affiliations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Doctor',
    tableName: 'doctors',
    timestamps: true,
    underscored: true,
  }
);

export default Doctor;