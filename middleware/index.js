const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign({ user },"secretkeyforcolorgame", {
    expiresIn: '365d'});
  return accessToken;
};

const validateToken = (req, res, next) => {
    const token = req.cookies.access_token;
    // console.log(token)
    if (!token) {
        return res.sendStatus(403);
      }    
    try {
      const validToken = verify(token, "secretkeyforcolorgame");
  if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (e) {
      return res.status(401).send('unauthorized');
  }};

module.exports = { createTokens, validateToken };

