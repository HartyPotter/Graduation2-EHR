// AUTH
export { default as register } from './patient/register.js'
export { default as login } from './patient/login.js'
export { default as logout } from './patient/logout.js'
export { default as verifyEmail } from './patient/verify-email.js'
export { default as resendEmail } from './patient/resend-email-code.js'
export { default as forgotPassword } from './patient/forgot-password.js'
export { default as resetPassword } from './patient/reset-password.js'
export { default as refreshToken } from './patient/refresh-accessToken.js'
// // EDIT
export { default as changePassword } from './patient/change-password.js'
export { default as editPatient } from './patient/edit-patient.js'

// // OTHER
export { default as getPatient } from './patient/get-patient.js'
export { default as deletePatient } from './patient/delete-patient.js'