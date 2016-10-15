let simpleAuthHook = sails.hooks.simpleauth;

import _ from 'lodash'
import Marlinspike from 'marlinspike'

if (!simpleAuthHook) {
  class SimpleAuth extends Marlinspike {

    constructor(sails) {
      super(sails, module)
    }

    configure() {
      sails.services.passport.loadStrategies()
    }
  }

  simpleAuthHook = Marlinspike.createSailsHook(SimpleAuth)
}

export default simpleAuthHook;