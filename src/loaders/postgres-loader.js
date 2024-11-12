import { Sequelize } from 'sequelize';
import { dbUri } from '../config/config.js';

const sequelize = new Sequelize(dbUri, {
  dialect: 'postgres',
  define: {
    freezeTableName: true,
    timestamps: true,
  },
});

export default sequelize;
