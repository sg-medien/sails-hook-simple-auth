/**
 * Hook dependencies
 */
import _ from 'lodash';
import passport from 'passport';
import injectCustomPolicies from './utils/injectCustomPolicies';

export default function simpleAuth(sails) {
  return {
    /**
     * Hook defaults
     */
    defaults: {

      __configKey__: {
        passport: {
          serializeUser: function(user, done) {
            done(null, user.id);
          },
          deserializeUser: function(id, done) {
            User.findOne({ id: id }, function (err, user) {
              done(err, user);
            });
          },
          strategies: {},
        },
        isNotAuthenticatedRedirect: '/login',
      },
    },

    /**
     * Hook configuration
     */
    configure() {
      const that = this;
      const config = sails.config[that.configKey];

      // If the http hook was found
      if (sails.hooks.http) {
        // Add the http middleware 'passportInit' if no custom middleware exists
        if (_.isUndefined(sails.config.http.middleware.passportInit)) {
          sails.config.http.middleware.passportInit = passport.initialize();
        }

        // Add the http middleware 'passportSession' if no custom middleware exists
        if (_.isUndefined(sails.config.http.middleware.passportSession)) {
          sails.config.http.middleware.passportSession = passport.session();
        }

        // Update middleware order
        if (sails.config.http.middleware.order.indexOf('session') !== -1) {
          sails.config.http.middleware.order.splice(sails.config.http.middleware.order.indexOf('session') + 1, 0, 'passportInit', 'passportSession');
        } else if (sails.config.http.middleware.order.indexOf('cookieParser') !== -1) {
          sails.config.http.middleware.order.splice(sails.config.http.middleware.order.indexOf('cookieParser') + 1, 0, 'passportInit', 'passportSession');
        } else {
          sails.config.http.middleware.order.splice(0, 0, 'passportInit', 'passportSession');
        }

        if (config.passport) {
          if (config.passport.serializeUser && typeof config.passport.serializeUser === 'function') {
            passport.serializeUser(config.passport.serializeUser);
          }

          if (config.passport.deserializeUser && typeof config.passport.deserializeUser === 'function') {
            passport.deserializeUser(config.passport.deserializeUser);
          }

          if (config.passport.strategies && typeof config.passport.strategies === 'object') {
            _.each(config.passport.strategies, function(strategy, name) {
              if (strategy.strategy && typeof strategy.strategy === 'function' && strategy.verify && typeof strategy.verify === 'function') {
                passport.use(name, new strategy.strategy(_.merge({}, strategy.options), strategy.verify));
              }
            });
          }
        }
      }
    },

    /**
     * Hook initialization
     *
     * @param  {Function} cb
     */
    initialize(cb) {
      // Only if the http and policies hook was found
      if (sails.hooks.http && sails.hooks.policies) {
        // Inject custom policies
        return injectCustomPolicies(sails, function customPoliciesInjected(err) {
          if (err) return cb(err);

          // Hook loaded
          return cb();
        });
      }
      else {
        // Hook loaded, but without changes
        return cb();
      }
    },
  };
}
