// AUTH
export { default as register } from './user/register.js' // Checked
export { default as login } from './user/login.js' // Checked
export { default as logout } from './user/logout.js' // Checked
export { default as verifyEmail } from './user/verify-email.js' // Checked
export { default as resendEmail } from './user/resend-email-code.js' // Checked
export { default as forgotPassword } from './user/forgot-password.js' // Checked
export { default as resetPassword } from './user/reset-password.js' // Checked
export { default as refreshToken } from './user/refresh-accessToken.js'
// // EDIT
export { default as changePassword } from './user/change-password.js' // Checked
export { default as editUser } from './user/edit-user.js' // Error

// // OTHER
export { default as getUser } from './user/get-user.js' // Checked
export { default as deleteUser } from './user/delete-user.js' // Checkd 