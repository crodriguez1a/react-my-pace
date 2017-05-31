// TODO Deprecate controller architecture in favor of Redux

import Polyfills from './utils/polyfills';
import Controllers from './controllers/index';
import attachFastClick from 'fastclick';
import Session from './session/routine';

export const App = {
  name: 'react-my-pace',
  /**
    Initialize all the Controllers

    @method _initializeControllers
    @private
  */
  initializeControllers() {
    for (let i in Controllers) {
      let controller = new Controllers[i]();
      controller.init();
    }
  },

  /**
    Apply a theme from local storage or use default

    @method applyTheme
    @private
  */
  applyTheme(theme) {
    document.getElementById('theme').className = `section ${theme}`;
  },

  init() {
    this.initializeControllers();
    this.applyTheme(Session.find('theme'));
    attachFastClick(document.body);
  }
};

App.init();
