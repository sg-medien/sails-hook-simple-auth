import http from 'http';

export default (req, res, next) => {
  const sails = req._sails;

  if (req.isSocket) {
    req = _.extend(req, _.pick(http.IncomingMessage.prototype, 'login', 'logIn', 'logout', 'logOut', 'isAuthenticated', 'isUnauthenticated'));
  }

  if (req.isAuthenticated()) {
    req.session._garbage = Date();
    req.session.touch();

    return next();
  }

  if (sails.config.simpleauth.isNotAuthenticatedMessage) {
    const error = new Error(sails.config.simpleauth.isNotAuthenticatedMessage);
    error.code = 'E_AUTHORIZATION';
    return res.forbidden(error);
  }

  return res.redirect(sails.config.simpleauth.isNotAuthenticatedRedirect);
};
