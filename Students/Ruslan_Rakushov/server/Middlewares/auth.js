const jwt = require('jsonwebtoken');
const User = require('../Models/user');
const { JWT_KEY } = require('../credentials');

const isAuthorized = async (req, res, next) => {
  console.log('in auth');
  // 401	Unauthorized	"Неавторизовано". Для получения запрашиваемого ответа нужна аутентификация. Статус похож на статус 403, но,в этом случае, аутентификация возможна. 
  next();
}

module.exports = isAuthorized;
