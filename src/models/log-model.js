import { DataTypes, Model } from 'sequelize';
import sequelize from '../loaders/postgres-loader.js';

class Log extends Model {}

Log.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    log_level: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    source: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    details: {
        type: DataTypes.JSONB,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    request_id: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    environment: {
        type: DataTypes.STRING(20),
        defaultValue: 'prod',
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,               // Pass the sequelize instance
    modelName: 'Log',        // Model name in Sequelize
    tableName: 'logs',       // Actual table name in the database
    timestamps: false,       // Disable Sequelize's automatic timestamps
});

export default Log;
