import * as utils from '../../utils/utils-index.js';

export const authorizeUser = async (req, res, next) => {
    const {user, role} = req.user;
    console.log(role);
    if (!(role === 'doctor' || role === 'admin')) {
        return utils.sendError(res, new utils.UnauthorizedError("Unauthorized user. Must be a Dcotor or an Admin"))
    }
    next();
};
