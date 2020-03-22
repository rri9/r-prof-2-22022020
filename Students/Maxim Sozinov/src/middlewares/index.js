import { apiMiddleware } from 'redux-api-middleware';
import messageMiddleware from './messageMiddleware.js';

export default [
   messageMiddleware,
   apiMiddleware,
];