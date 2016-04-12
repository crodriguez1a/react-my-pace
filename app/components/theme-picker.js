import React from 'react';
import Session from './../session/routine';

/**
  Renders the theme picker

  @class ThemePicker
  @extends React Component
  @private
*/
class ThemePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: Session.find('theme'),
      model: [
        { name: 'summer' },
        { name: 'ocean' },
        { name: 'energy' },
        { name: 'focus' },
        { name: 'blurple' },
        { name: 'sunrise' },
        { name: 'emerald' },
        { name: 'rosewater' }
      ]
    }
  }

  /**
    Update the current theme, sync with session

    @method update
    @private
  */
  update(theme) {
    this.setState({ theme });

    // since body isn't a Component, we apply theme change the old school way
    document.getElementById('theme').className = `section ${theme}`;

    // sync app state
    Session.store('theme', theme);
  }

  /**
    Render theme picker

    @method render
    @private
  */
  render() {
    let self = this;
    // Todo arrow functions?
    return (
      <ul>
        {this.state.model.map(function(theme) {
          return <li key={theme.name}><a onClick={self.update.bind(self, theme.name)} className={`theme ${theme.name} ${self.state.theme === theme.name ? 'is-active' : ''}`}></a></li>
        })}
      </ul>
    );
  }
};

export default ThemePicker;
