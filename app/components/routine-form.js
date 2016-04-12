import React from 'react';
import Session from './../session/routine';
import ProgressClock from './../components/progress-clock';
import { shortUnitName } from './../utils/conversions';
import { Presets } from './../presets/routines';
import _ from 'lodash';

/**
  Routine form fields

  @class RoutineForm
  @extends React Component
  @private
*/
class RoutineForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: props.timer,
      units: props.units,
      controller: props.controller,
      controls: props.controls,
      dirty: true,
      routine: Session.find('name'),
      interval: Session.find('interval'),
      totalTasks: Session.find('totalTasks'),
      shouldRest: Session.find('shouldRest'),
      restInterval: Session.find('restInterval'),
      withSound: Session.find('withSound'),
      editMode: false
    };
  }

  /**
    Change event for interval

    @method updateIntervalDuration
    @private
  */
  updateIntervalDuration = (event) => {
    this.setState({
      interval: event.target.value,
      dirty: true
    });
  }

  /**
    Change event for units

    @method updateIntervalUnit
    @private
  */
  updateIntervalUnit = (event) => {
    this.setState({
      units: event.target.value,
      dirty: true
    });
  }

  /**
    Change event for tasks

    @method updateTotalTasks
    @private
  */
  updateTotalTasks = (event) => {
    this.setState({
      totalTasks: event.target.value,
      dirty: true
    });
  }

  /**
    When an input field changes and changes have not been applied, set state to dirty

    @method makeDirty
    @private
  */
  makeDirty = (event) => {
    this.setState({ dirty: true });
  }

  /**
    Toggle shouldRest property

    @method toggleShouldRest
    @private
  */
  toggleShouldRest = (onOff, event) => {
    let shouldRest = onOff;
    this.setState({
      shouldRest,
      dirty: true
    });
  }

  /**
    Update rest interval

    @method updateRestInterval
    @private
  */
  updateRestInterval = (interval) => {
    this.setState({
      restInterval: interval,
      dirty: true
    });
  }

  /**
    Signal if the name of the upcoming task should be displayed

    @method displayNext
    @private
  */
  displayNext = (onOff, event) => {
    let showNext = onOff;
    this.setState({
      showNext,
      dirty: true
    });
  }

  /**
    Change event for preset routine selections

    @method updatePresetRoutine
    @private
  */
  updatePresetRoutine = (event) => {
    let routine = event.target.value;

    this.setState({
      editMode: true,
      dirty: true,
      routine
    });

    // Update routine with preset selected
    this.syncWithPreset(routine);
  }

  /**
    Reset form state to be in sync with preset

    @method syncWithPreset
    @private
  */
  syncWithPreset = (routine) => {
    // Fetch routine from presets
    let preset = Presets(routine);
    this.syncState(preset);
  }

  /**
    Reset form state to be in sync with session

    @method syncWithSession
    @private
  */
  syncWithSession = () => {
    this.syncState(Session);
  }

  /**
    Reset form state to be in sync with model provided

    @method syncState
    @private
  */
  syncState = (routine) => {
    // Update component state
    this.setState({
      interval: routine.find('interval'),
      totalTasks: routine.find('totalTasks'),
      shouldRest: routine.find('shouldRest'),
      restInterval: routine.find('restInterval'),
      routine: routine.find('name')
    });
  }

  /**
    Revert to sync with previously saved routine params

    @method applyReset
    @private
  */
  applyReset = () => {
    // Sync with the routine model
    this.syncWithPreset(Session.find('name'));
    // Sync all of the components from within the controller
    this.syncWithController();
    // Update dirty state
    this.setState({ dirty: true });
  }

  /**
    Tell the contoller to re-compute with the updated routine params

    @method syncWithController
    @private
  */
  syncWithController = () => {
    this.state.controller.routineSync();
  }

  /**
    Update user state, timer state, and dirty state with user's selections

    @method applyChanges
    @private
  */
  applyChanges = () => {
    // Stop the timer if it is running
    this.state.timer.stop();

    // Compute interval with units provided
    let i = this.state.interval;
    let u = this.state.units;
    this.state.interval = u === 'seconds' ? i : i * 60;

    // Cache current state
    this.setState({ dirtyState: _.omit(this.state, ['editMode']) });

    // Routine params/options
    let totalTasks = this.state.totalTasks;
    let shouldRest = this.state.shouldRest;
    let showNext = this.state.showNext;
    let restInterval = this.state.restInterval;
    let interval = this.state.interval;
    let name = this.state.routine;

    // Sync with user state
    Session.saveAll({
      name,
      interval,
      totalTasks,
      shouldRest,
      showNext,
      restInterval
    });

    this.syncWithController();

    // Update dirty
    this.setState({ dirty: false });
  }


  /**
    Hide/show the routine form elements

    @method toggleEditMode
    @private
  */
  toggleEditMode = () => {
    // toggle
    this.setState({ editMode: !this.state.editMode });

    // when collapsing form, if dirty, sync with session
    if (this.state.dirty && this.state.editMode) {
      this.syncWithSession();
    }
  }

  /**
    Signal if sounds should be on or off

    @method includeSound
    @private
  */
  toggleSound = () => {
    this.setState({ withSound: !this.state.withSound });
    Session.save('withSound', !this.state.withSound);
  }

  /**
    Render form

    @method render
    @private
  */
  render = () => {
    return (
      <div className='content'>
        <ul className='control manage-routine'>
          <li className='select-routine'>
            <span className='select'>
              <select onChange={this.updatePresetRoutine} value={this.state.routine}>
                <option value='ShortTabata'>Short Tabata</option>
                <option value='Boxing12Rounds'>Boxing 12 Rounds</option>
              </select>
            </span>
          </li>
          <li className='edit-routine'>
            <a className={`button ${this.state.editMode ? 'is-active' : ''}`} onClick={this.toggleEditMode}><i className='fa typcn typcn-pencil'></i></a>
          </li>
          <li className='edit-sound'>
            <a className={`button`} onClick={this.toggleSound}><i className={`fa typcn typcn-volume-${this.state.withSound ? 'up' : 'mute'}`}></i></a>
          </li>
        </ul>
        <div className={`edit-mode ${this.state.editMode ? '' : 'hide'}`}>
          <p className='control has-icon'>
            <input onChange={this.updateTotalTasks} placeholder='total tasks' value={this.state.totalTasks} className='input' type='number' />
            <i className='fa fa-repeat'></i>
          </p>
          <p className='control has-icon is-grouped'>
            <input onClick={this.makeDirty} onChange={this.updateIntervalDuration} placeholder='task duration' value={this.state.interval} className='input' type='number' />
            <i className='fa fa-clock-o'></i>
            <span className='select'>
              <select onChange={this.updateIntervalUnit} value={this.state.units}>
                <option value='minutes'>minutes</option>
                <option value='seconds'>seconds</option>
              </select>
            </span>
          </p>
          <ul className='toggle-list'>
            <li className='control has-addons'>
              <a className={`button ${this.state.shouldRest ? 'is-active' : 'is-outlined'}`} onClick={this.toggleShouldRest.bind(this, true)}>
                <i className='fa typcn typcn-social-flickr'></i>
              </a>
              <a className={`button ${this.state.shouldRest ? 'is-outlined' : 'is-active'}`}  onClick={this.toggleShouldRest.bind(this, false)}>
                <i className='fa typcn typcn-flash-outline'></i>
              </a>
            </li>
            <li className={`control has-addons ${this.state.shouldRest ? '' : 'hide'}`}>
              <a className={`button ${this.state.restInterval === 10 ? 'is-active' : 'is-outlined'}`} onClick={this.updateRestInterval.bind(this, 10)}>
                10
              </a>
              <a className={`button ${this.state.restInterval === 30 ? 'is-active' : 'is-outlined'}`} onClick={this.updateRestInterval.bind(this, 30)}>
                30
              </a>
              <a className={`button ${this.state.restInterval === 60 ? 'is-active' : 'is-outlined'}`} onClick={this.updateRestInterval.bind(this, 60)}>
                60
              </a>
            </li>
            <li className='control has-addons'>
              <a className={`button ${this.state.showNext ? 'is-active' : 'is-outlined'}`} onClick={this.displayNext.bind(this, true)}>
                <i className='fa fa-bell-o'></i>
              </a>
              <a className={`button ${this.state.showNext ? 'is-outlined' : 'is-active'}`} onClick={this.displayNext.bind(this, false)}>
                <i className='fa fa-bell-slash-o'></i>
              </a>
            </li>
          </ul>
          <p className='toggle-buttons control is-fullwidth has-addons'>
            <a className={`button is-primary ${this.state.dirty ? '' : 'is-disabled'}`} onClick={this.applyChanges}>
              Apply <i className='fa fa-check'></i>
            </a>
            <a className={`button is-primary ${this.state.dirty ? 'is-disabled' : ''}`} onClick={this.applyReset}>
              Reset <i className='fa fa-reply'></i>
            </a>
          </p>
          <p className='control is-fullwidth help'>
            <i className='fa fa-question-circle'></i>
          </p>
        </div>
      </div>
    );
  }
};

export default RoutineForm;
