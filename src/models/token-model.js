import { DataTypes, Model } from 'sequelize';
import sequelize from '../loaders/postgres-loader.js';

class Token extends Model {}

Token.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  expires_in: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  created_by_ip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  revoked_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Token',
  tableName: 'tokens',
  timestamps: true,
  underscored: true,
  // Define a composite unique key on user_id and user_type
  uniqueKeys: {
    tokens_unique: {
      fields: ['user_id', 'user_type'],
    },
  },
});

export default Token;


/**
 * @swagger
 * components:
 *   schemas:
 *     Token:
 *       type: object
 *       required:
 *         - user_id
 *         - refresh_token
 *         - expires_in
 *         - created_by_ip
 *         - valid
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the token.
 *           example: 1
 *         user_id:
 *           type: integer
 *           description: The ID of the user associated with the token.
 *           example: 1
 *         refresh_token:
 *           type: string
 *           description: The refresh token associated with the user.
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.1FnWsUb3eD36wfnPlpYWlUzf_tg5hr8Ll-ehXg0V5tw"
 *         expires_in:
 *           type: string
 *           format: date-time
 *           description: The expiration date of the refresh token.
 *           example: "2024-11-19T10:30:00Z"
 *         created_by_ip:
 *           type: string
 *           description: The IP address that created the token.
 *           example: "192.168.0.1"
 *         valid:
 *           type: boolean
 *           description: Whether the token is still valid.
 *           example: true
 *         revoked_at:
 *           type: string
 *           format: date-time
 *           description: The date when the token was revoked (if applicable).
 *           example: null
 *       example:
 *         id: 1
 *         user_id: 1
 *         refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MX0.1FnWsUb3eD36wfnPlpYWlUzf_tg5hr8Ll-ehXg0V5tw"
 *         expires_in: "2024-11-19T10:30:00Z"
 *         created_by_ip: "192.168.0.1"
 *         valid: true
 *         revoked_at: null
 */
