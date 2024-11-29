import * as utils from '../../utils/utils-index.js';

export const authorizeUser = async (req, res, next) => {
    const user = req.user;
    if (!(user.role === 'doctor' || user.role === 'admin')) {
        return utils.sendError(res, new utils.UnauthorizedError("Unauthorized user. Must be a Dcotor or an Admin"))

    }
    next();
};
