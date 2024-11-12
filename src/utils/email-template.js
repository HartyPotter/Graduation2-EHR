export const verificationEmailTemplate = (name, code, actionType) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
    <h2 style="color: #333;">Hello, ${name}</h2>
    <p>Your verification code for <strong>${actionType}</strong> is:</p>
    <div style="font-size: 24px; font-weight: bold; color: #2e6da4; margin: 20px 0;">${code}</div>
    <p>Please use this code within the next 5 minutes. If you didn’t request this, you can safely ignore this email.</p>
    <p>Best regards,<br/>EHR App Team</p>
  </div>
`;

export const welcomeEmailTemplate = (name) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
    <h2 style="color: #333;">Welcome, ${name}!</h2>
    <p>Thank you for joining EHR App. We’re thrilled to have you on board! Explore and take advantage of our features designed to make your experience seamless and efficient.</p>
    <p>If you have any questions or need assistance, feel free to reach out to us.</p>
    <p>Best regards,<br/>EHR App Team</p>
  </div>
`;

export const resetPasswordEmailTemplate = (name, resetLink) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
    <h2 style="color: #333;">Hi, ${name}</h2>
    <p>We received a request to reset your password. Click the button below to reset it:</p>
    <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; color: #ffffff; background-color: #2e6da4; border-radius: 4px; text-decoration: none;">Reset Password</a>
    <p>If you didn’t request this, please ignore this email.</p>
    <p>Best regards,<br/>EHR App Team</p>
  </div>
`;

export const resetPasswordSuccessEmailTemplate = (name) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
    <h2 style="color: #333;">Hi, ${name}</h2>
    <p>Your password was reset successfully! You can now login with your new password.</p>
    <p>If you didn’t request this, your are COOKED.</p>
    <p>Best regards,<br/>EHR App Team</p>
  </div>
`;


export const changePasswordSuccessEmailTemplate = (name) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
    <h2 style="color: #333;">Hi, ${name}</h2>
    <p>Your password was changed successfully! You can now login with your new password.</p>
    <p>If you didn’t request this, your are COOKED.</p>
    <p>Best regards,<br/>EHR App Team</p>
  </div>
`;

export const cancellationEmailTemplate = (name) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
    <h2 style="color: #333;">Dear ${name},</h2>
    <p>We’re sorry to see you go. Your account has been successfully cancelled.</p>
    <p>If you have any feedback or suggestions on how we can improve, please let us know. We hope to see you again in the future!</p>
    <p>Best regards,<br/>EHR App Team</p>
  </div>
`;
