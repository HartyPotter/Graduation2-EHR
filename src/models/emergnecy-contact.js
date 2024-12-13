import { DataTypes, Model } from 'sequelize';
import sequelize from '../loaders/postgres-loader.js';

class Contact extends Model {}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: "Patients",
        key: 'id'
    },
      unique: true,
      onDelete: 'CASCADE'
    },
    contact_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'),
    },
    relation_to_patient: {
        type: String.ENUM("Mother", "Father", "Sibling", "Son", "Daughter", "Spouse", "Friend", "Family Member"),
        allowNull: false
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
    tableName: 'Contactss',
    timestamps: true,
    underscored: true,
  }
);

export default Contact;