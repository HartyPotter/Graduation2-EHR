import crypto from 'crypto'

export const generateUserId = (role, national_id) => {
    const idPrefix = role === 'patient' ? "PT" : "DR";
    const hash = crypto.createHash('sha256').update(national_id).digest('hex');
    return `${idPrefix}${hash.slice(0, 6).toUpperCase()}`;
  };