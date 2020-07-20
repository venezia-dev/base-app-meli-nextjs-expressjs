const meli = require('mercadolibre');
require('dotenv').config();

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

const tokens = {
  access_token: null,
  expires: null,
};

const setTokens = (newTokens) => {
  const date = new Date();
  const time_threshold = 6; // o token do mercadolivre dura até 6 horas
  date.setHours(date.getHours() + time_threshold, 0, 0, 0);
  tokens.expires = date;
  tokens.access_token = newTokens.access_token;
};

const validateToken = (req, res, next) => {
  if (req.session.user) {
    if (!tokens.access_token || (new Date()) >= tokens.expires) {
      const redirect_uri = REDIRECT_URI + req.baseUrl + req.path;
      const { code } = req.query;
      const meliObject = new meli.Meli(CLIENT_ID, CLIENT_SECRET);
      console.log(code);
      if (code) {
        meliObject.authorize(code, redirect_uri, (error, response) => {
          if (error) {
            console.log(error);
            throw error;
          }
          console.log("2222");
          setTokens(response);
          res.locals.access_token = tokens.access_token;
          res.redirect(redirect_uri);
        });
      } else {
        console.log(redirect_uri);
        console.log("asdasd")
        res.redirect(meliObject.getAuthURL());
      }
    } else {
      console.log("333");
      res.locals.access_token = tokens.access_token;
      next();
    }
  } else {
    console.log("No estas Iniciado");
    res.redirect('/');
  }
}

module.exports = {
  validateToken
};