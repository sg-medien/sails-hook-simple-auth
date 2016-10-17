/**
 * Util dependencies
 */
import path from 'path';
import _ from 'lodash';
import includeAll from 'include-all';

/**
 * Inject custom api policies.
 *
 * @param {Object} sails
 * @param {Function} cb
 */
export default function injectCustomPolicies(sails, cb) {
  includeAll.optional({
    dirname: path.resolve(__dirname, '../api/policies'),
    filter: new RegExp('(.+)\\.(' + sails.config.moduleloader.sourceExt.join('|') + ')$'),
    replaceExpr: null,
    flatten: true,
    keepDirectoryPath: true,
  }, function customPoliciesLoaded(err, customPolicies) {

    if (err) return cb(err);

    // If some custom policies found
    if (_.size(customPolicies)) {
      // Load default policies
      sails.modules.loadPolicies(function defaultPoliciesLoaded(innerErr, defaultPolicies) {
        if (innerErr) return cb(innerErr);

        // Add custom policies
        _.each(customPolicies, function(customPolicy, name) {
          // Bind and add custom policy (only if we could not find a default policy with the same name)
          if (_.isUndefined(defaultPolicies[name])) {
            // Add a reference to the Sails app that loaded the policy
            customPolicy.sails = sails;

            // Bind all methods to the policy context
            _.bindAll(customPolicy);

            // Add custom policy
            sails.hooks.policies.middleware[name] = customPolicy;
          }
        });

        return cb();
      });
    } else {
      return cb();
    }
  });
}
