import React from 'react';
import Session from './../session/routine';
import { Sounds } from './../utils/constants';
import Player from 'audio-player';

const audioPlayer = new Player();


/**
  Controls for the radial progress clock

  @class ProgressControls
  @extends React Component
  @private
*/
class ProgressControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: props.timer,
      showThemes: false,
      status: 'stopped',
      active: 'pause'
    };
    this.keyboardControl();
    this.tapControl();
  }

  state = null;

  /**
    Provide the user with keyboard access to pause and play

    @method keyboardControl
    @private
  */
  keyboardControl = () => {
    document.addEventListener('keydown', (e) => {
      // Enable Spacebar
      if (e.keyIdentifier === 'U+0020') {
        e.preventDefault();
        if (this.state.status === 'started') {
          this.pauseTimer();
        } else {
          this.startTimer();
        }
      }
    });
  }

  /**
    Provide user with pause play access from clicking/tapping on theme container

    @method tapControl
    @private
  */
  tapControl = () => {
    document.getElementById('theme').addEventListener('click', (e) => {
      if (this.state.status === 'started') {
        this.pauseTimer();
      }
    });
  }

  /**
    Start the timer and update state with timer status

    @method startTimer
    @private
  */
  startTimer = (event) => {
    let interval = Session.find('interval');

    this.state.timer.start(this.state.timer.getStatus() === 'paused' ? (this.state.timer.getDuration() / 1000) : interval);
    this.setState({
      status: this.state.timer.start().getStatus(),
      active: 'play'
    });

    if (Session.find('withSound')) {
      audioPlayer.play(Sounds.play);
    }

    this.hideThemes();
  }

  /**
    Hide themes if open

    @method hideThemes
    @private
  */
  hideThemes = () => {
    this.setState({
      showThemes: false
    });
    document.getElementById('theme-picker').className = 'theme-picker hide';
  }

  /**
    Pause the timer and update state with timer status

    @method startTimer
    @private
  */
  pauseTimer = (event) => {
    this.state.timer.pause();
    this.setState({
      status: this.state.timer.pause().getStatus(),
      active: 'pause'
    });

    if (Session.find('withSound')) {
      audioPlayer.play(Sounds.pause);
    }

    this.hideThemes();
  }

  /**
    Show/hide available themes

    @method toggleThemes
    @private
  */
  toggleThemes = (event) => {
    this.setState({
      showThemes: !this.state.showThemes
    });

    document.getElementById('theme-picker').className = `theme-picker ${!this.state.showThemes ? '' : 'hide'}`;
  }

  /**
    Render the controls

    @method render
    @private
  */
  render = () => {
    return (
      <section>
        <div className='tabs is-boxed is-centered'>
          <ul>
            <li className={this.state.active === 'play' ? 'is-active' : ''}>
              <a onClick={this.startTimer}>
                <i className='fa fa-play'></i>
              </a>
            </li>
            <li className={`theme-tab ${this.state.showThemes ? 'is-active' : ''}`}>
              <a onClick={this.toggleThemes}>
                <i className='fa fa-adjust'></i>
              </a>
            </li>
            <li className={this.state.active === 'pause' ? 'is-active' : ''}>
              <a onClick={this.pauseTimer}>
                <i className='fa fa-pause'></i>
              </a>
            </li>
          </ul>
        </div>
      </section>
    );
  }
};

export default ProgressControls;
