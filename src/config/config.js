export { default as swaggerConfig } from './swagger.config.js'
import { config } from 'dotenv';
config();

//NOTE: If you are running the project in an instance, you should store these secret keys in its configuration settings.
// This type of storing secret information is only experimental and for the purpose of local running.

const { DB_URI, PORT, JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY, JWT_RESET_SECRET_KEY, APP_MAIL, APP_MAIL_KEY } = process.env

export const port = PORT || 3000;
export const dbUri = DB_URI;
// export const awsAccessKey = AWS_ACCESS_KEY_ID;
// export const awsSecretAccessKey = AWS_SECRET_ACCESS_KEY;
// export const awsRegion = AWS_REGION;
// export const bucketName = BUCKET_NAME;
export const prefix = '/api';
export const specs = "/docs";
export const app_mail = APP_MAIL
export const app_mail_key = APP_MAIL_KEY

// JWT KEYS
export const jwtSecretKey = JWT_ACCESS_SECRET_KEY
export const refreshTokenSecretKey = JWT_REFRESH_SECRET_KEY
export const resetSecretKey = JWT_RESET_SECRET_KEY