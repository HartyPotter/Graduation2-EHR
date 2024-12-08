import userModel from './user-model.js';
import tokenModel from './token-model.js';
import logModel from './log-model.js';

userModel.hasMany(tokenModel, { foreignKey: 'user_id' });
tokenModel.belongsTo(userModel, { foreignKey: 'id' });

export const User = userModel;
export const Token = tokenModel;
export const Log = logModel;