import logger from 'services/logger';

export default function clientMiddleware(client) {
  return ({ dispatch, getState }) => next => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { types, promise, ...rest } = action;

    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;

    next({ ...rest, type: REQUEST });

    return promise(client).then(
      result => next({ ...rest, result, type: SUCCESS }),
      error => next({ ...rest, error, type: FAILURE }),
    ).catch((error) => {
      logger.error('MIDDLEWARE ERROR:', error);
      return next({ ...rest, error, type: FAILURE });
    });
  };
}