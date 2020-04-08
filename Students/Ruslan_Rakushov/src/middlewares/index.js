import { apiMiddleware } from "redux-api-middleware";
import messageMiddleware from './messageMiddleware.js';
import chatMiddleware from './chatMiddleware.js';
import profileMiddleware from './profileMiddleware.js';

export default [
  apiMiddleware,
  messageMiddleware,
  chatMiddleware,
  profileMiddleware,
];
