import jwt from 'jsonwebtoken';
import { jwtSecretKey, refreshTokenSecretKey, resetSecretKey } from '../../config/config.js';
import { redisClient } from '../loaders/redis-loader.js';

export async function signAccessToken(userId, role) {
  const accessToken = jwt.sign(
    { id: userId, role},
    jwtSecretKey,
    {
      expiresIn: '30d',
    }
  );
  // // Stores the access token in a Redis cache for faster access to the logged in user without having to access the main DB
  // await redisClient.set(`accessToken:${userId}`, accessToken, { EX: 3600 });
  return accessToken;
};


export async function signRefreshToken(userId, role) {
  const refreshToken = jwt.sign(
    { id: userId, role },
    refreshTokenSecretKey,
    {
      expiresIn: '30d',
    }
  );
  // // Stores the refresh token in a Redis cache for faster access to the logged in user without having to access the main DB
  await redisClient.set(`refreshToken:${userId}`, refreshToken, { EX: 604800 }); // refreshToken expires in 7 days
  return refreshToken;
};


export async function signResetToken(email) {
  const resetToken = jwt.sign(
    { email },
    resetSecretKey,
    {
      expiresIn: '1h'
    }
  );
  await redisClient.set(`reset:${email}`, resetToken, { EX: 86400}); // resetToken expires in 1 day
  return resetToken;
}


export async function signConfirmCodeToken(userId, email, confirmCode) {
  const confirmCodeToken = jwt.sign(
    { id: userId, email, code: confirmCode },
    jwtSecretKey,
    {
      expiresIn: '5m',
    }
  );
  return confirmCodeToken;
};


export async function verifyRefreshToken(refreshToken) {
  try {
    // Decode and verify the refresh token using the secret key
    const decoded = jwt.verify(refreshToken, refreshTokenSecretKey);

    // Retrieve the stored refresh token from Redis
    const storedToken = await redisClient.hGet(`user:${decoded.id}`, 'refreshToken');
    console.log("stored Token: ")
    console.log(storedToken);

    console.log("refresh Token: ")
    console.log(refreshToken);

    // If token is not found or invalid, return false
    if (!storedToken || storedToken != refreshToken) {
      return { isValid: false, id: null };
      // console.log("refreshToken donest equal storedToken")
    }

    // If everything is valid, return the decoded user ID
    return { isValid: true, id: decoded.id };
  } catch (error) {
    console.error('Error verifying refresh token:', error);
    return { isValid: false, id: null };
  }
}

export async function revokeUserRedisLogin(userId) {
  await redisClient.del(`user:${userId}`);
};