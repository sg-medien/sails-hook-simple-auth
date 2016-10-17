export default (req, res, next) => {
  const sails = req._sails;

  if (req.isAuthenticated()) {
    req.session._garbage = Date();
    req.session.touch();

    return next();
  }

  return res.redirect(sails.config.simpleauth.isNotAuthenticatedRedirect);
};
