import * as utils from '../../utils/utils-index.js';

const errorMiddleware = (err, req, res, next) => {
  if (!err.statusCode) {
    err = new utils.BaseError(err.message || 'An unexpected error occurred', err.statusCode);
  }
  console.error(err)
  return utils.sendError(res, err);
};

export default errorMiddleware;
