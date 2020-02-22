const jwt = require('jsonwebtoken');
const config = require('../config/default');
const { getAndUpdateTokens } = require('../helpers/index');
const setDataInCookie = require('../controllers/setDataInCookies');

const setTokens = (tokens, res) => {
  const { accessToken, refreshToken } = tokens;
  setDataInCookie(res, 'accessToken', accessToken, config.jwt.tokens.access.expiresIn);
  setDataInCookie(res, 'refreshToken', refreshToken, config.jwt.tokens.refresh.expiresIn);
};

const processingRefreshToken = async (refreshToken, res, req, next) => {
  if (!refreshToken) {
    return res.status(401)
      .json({ message: 'Tokens expired, please log in again' });
  }
  let payload;
  try {
    payload = jwt.verify(refreshToken, config.jwt.secret);
    if (payload.type !== 'refresh') {
      return res.status(400)
        .json({ message: 'Invalid token, please log in again' });
    }
  } catch (e) {
    return res.status(400)
      .json({ message: 'Invalid token, please log in again' });
  }
  const tokens = await getAndUpdateTokens(payload.userId);
  req.local = tokens;
  setTokens(tokens, res);
  return next();
};

module.exports = async (req, res, next) => {
  if (!req.cookies) {
    return res.status(401)
      .json({ message: 'Unauthorized' });
  }
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken) {
    return processingRefreshToken(refreshToken, res, req, next);
  }
  let payload;
  try {
    payload = jwt.verify(accessToken, config.jwt.secret);
  } catch (e) {
    return processingRefreshToken(refreshToken, res, req, next);
  }
  if (payload.type !== 'access') {
    return res.status(400)
      .json({ message: 'Invalid token, please log in again' });
  }
  return next();
};
