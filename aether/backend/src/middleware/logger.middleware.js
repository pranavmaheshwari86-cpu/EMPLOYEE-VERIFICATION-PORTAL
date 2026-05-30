import morgan from 'morgan';
import logger from '../utils/logger.js';

const stream = {
  write: (message) => {
    logger.http(message.trim());
  },
};

export const morganMiddleware = morgan(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms',
  { stream }
);
