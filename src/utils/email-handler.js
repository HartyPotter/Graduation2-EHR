import nodemailer from 'nodemailer';
import { app_mail, app_mail_key } from '../../config/config.js';
import * as emailTemplate from './email-template.js';

// Initialize nodemailer
const NodeMailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: app_mail, // your email address
    pass: app_mail_key,
  },
});

// Function to send a code verification email
export const sendVerificationEmail = async (email, name, code, actionType) => {
  try {
    await NodeMailer.sendMail({
      from: `"EHR App" <${app_mail}>`,
      to: email,
      subject: `${capitalize(actionType)} Verification Code`,
      html: emailTemplate.verificationEmailTemplate(name, code, actionType)
    });

    console.log(`Verification email sent to ${name}`);
  } catch (error) {
    console.error(`Error sending verification email: ${error.message}`);
    throw new Error('Failed to send verification email');
  }
};

// Function to send a welcome email
export const sendWelcomeEmail = async (email, name) => {
  try {
    await NodeMailer.sendMail({
      from: `"EHR App" <${app_mail}>`,
      to: email,
      subject: 'Welcome to EHR App!',
      html: emailTemplate.welcomeEmailTemplate(name)
    });

    console.log(`Welcome email sent to ${name}`);
  } catch (error) {
    console.error(`Error sending welcome email: ${error.message}`);
    throw new Error('Failed to send welcome email');
  }
};

// Function to send a password reset email
export const sendResetPasswordEmail = async (email, name, resetLink) => {
  try {
    await NodeMailer.sendMail({
      from: `"EHR APP" <${app_mail}>`,
      to: email,
      subject: "Forgot your password? Not a problem, reset it here",
      html: emailTemplate.resetPasswordEmailTemplate(name, resetLink)
    });

    console.log(`Password reset email sent to ${name}`);
  } catch (error) {
    console.error(`Error sending password reset email: ${error.message}`);
    throw new Error('Failed to send password reset email');
  }
};

// Function to send a success password reset email
export const sendResetSuccessEmail = async (email, name) => {
  try {
    await NodeMailer.sendMail({
      from: `"EHR APP" <${app_mail}>`,
      to: email,
      subject: "Successfully reset your password",
      html: emailTemplate.resetPasswordSuccessEmailTemplate(name)
    });

    console.log(`Reset success email sent to ${name}`);
  } catch (error) {
    console.error(`Error sending reset success email: ${error.message}`);
    throw new Error('Failed to send reset success email');
  }
};

// Function to send a success password change email
export const sendPasswordChangeEmail = async (email, name) => {
  try {
    await NodeMailer.sendMail({
      from: `"EHR APP" <${app_mail}>`,
      to: email,
      subject: "Hurray! you changed your password",
      html: emailTemplate.changePasswordSuccessEmailTemplate(name)
    });
    
    console.log(`Change password email sent to ${name}`);
  } catch (error) {
    console.error(`Error sending change password email: ${error.message}`);
    throw new Error('Failed to send change password email');
  }
};

// Function to send a cancellation email
export const sendCancellationEmail = async (email, name) => {
  try {
    await NodeMailer.sendMail({
      from: `"EHR App" <${app_mail}>`,
      to: email,
      subject: 'Account Cancellation Confirmation',
      html: emailTemplate.cancellationEmailTemplate(name)
    });

    console.log(`Cancellation email sent to ${name}`);
  } catch (error) {
    console.error(`Error sending cancellation email: ${error.message}`);
    throw new Error('Failed to send cancellation email');
  }
};



// Helper function to capitalize action types
export const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default { sendVerificationEmail, sendWelcomeEmail, sendResetPasswordEmail, sendResetSuccessEmail, sendPasswordChangeEmail, sendCancellationEmail };