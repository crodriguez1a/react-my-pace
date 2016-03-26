import Modules from './modules/index';

export const App = {
  name: 'react-my-pace',
  /**
    Initialize all the modules

    @method _initializeModules
    @private
  */
  _initializeModules() {
    for (let i in Modules) {
      Modules[i].init();
    }
  },
  init() {
    this._initializeModules();
  }
};

App.init();
