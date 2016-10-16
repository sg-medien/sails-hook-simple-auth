/**
 * Hook dependencies
 */
import _ from 'lodash';
import path from 'path';
import buildDictionary from 'sails-build-dictionary';

export default function simpleAuth(sails) {
  return {

    /**
     * Hook defaults
     */
    defaults: {

      __configKey__: {},
    },

    /**
     * Hook configuration
     */
    configure() {
      const
        that = this;
    },

    /**
     * Hook initialization
     *
     * @param  {Function} cb
     */
    initialize(cb) {
      const
        that = this;

      // Hook loaded
      return cb();
    },
  };
}
