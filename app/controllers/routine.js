import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Timer from 'timer.js';
import Session from './../session/routine';
import { PieChart } from 'react-d3-basic';
import ProgressClock from './../components/progress-clock';
import ProgressBar from './../components/progress-bar';
import ProgressControls from './../components/progress-controls';
import RoutineForm from './../components/routine-form';
import TaskCount from './../components/task-count';
import ThemePicker from './../components/theme-picker';
import RestDuration from './../components/rest-duration';
import { radialColors, Sounds } from './../utils/constants';
import Player from 'audio-player';

const audioPlayer = new Player();

/**
  Assemblage of all components

  @module RoutineController
  @returns Class
  @private
*/
class RoutineController {
  constructor() {
    /**
      Keep track elapsed intervals in sequence (including rests)

      @property progressCount
      @private
      @returns Number
    */
    this.progressCount = 0;

    /**
      Keep track of elapsed tasks in sequence (excludes rest intervals)

      @property taskCount
      @private
      @returns Number
    */
    this.taskCount = Session.find('totalTasks');

    /**
      Configure D3 pie chart

      @property chartConf
      @private
      @returns Object
    */
    this.chartConf = {
      width: 320,
      height: 320,
      innerRadius: 110,
      name(d) {
        return d.name;
      },
      value(d) {
        return d.value;
      },
      series: [
        {
          field: 'remaining',
          name: 'remaining',
          color: radialColors.background
        },
        {
          field: 'time',
          name: 'time',
          color: radialColors.primary
        }
      ]
    }
  }

  /**
    Render chart as part of running timer callback

    @method renderChart
    @private
  */
  renderChart = () => {
    this.timer = new Timer({
      tick: 0.001,
      ontick: (ms) => {
        this.updateClock(ms);
      },
      onend: () => {
        this.updateCount();
        if (Session.find('withSound')) {
          //play sound
          let currentSequenceInterval = Session.find('sequence')[this.progressCount];
          audioPlayer.play(currentSequenceInterval && currentSequenceInterval.rest ? Sounds.rest : Sounds.end);
        }
      }/*,
      onstart() { },
      onpause() { }*/
    });
  }

  /**
    Sync display with model, when model has changes have been applied from form

    @method routineSync
    @private
  */
  routineSync = () => {
    let interval = Session.find('interval');

    // Update interval sequence for this session
    Session.buildIntervalSequence();

    // Update timer interval internally
    this.timer._.interval = interval;

    // Update display
    this.updateClock(interval * 1000);
    this.updateCount(true);
    this.renderRestDuration();
  }

  /**
    Update the progress of the clock

    @method updateClock
    @private
  */
  updateClock = (ms) => {
    // Fetch current interval from model
    let currentInterval = Session.find('interval');

    // Calc running time
    let running = (ms / 1000) / currentInterval * 100;

    // Computed data based on running timer
    let data = [
      {
        name: 'time',
        value: 100 - running
      },
      {
        name: 'remaining',
        value: running
      }
    ];

    // Render Clock
    this.clock = ReactDOM.render(
      <ProgressClock
        clock={ms === -1 ? moment(currentInterval * 1000).format('mm:ss:SS') : moment(ms).format('mm:ss:SS')}
        count={this.progressCount}
        >
        <PieChart
          data={data}
          width={this.chartConf.width}
          height={this.chartConf.height}
          chartSeries={this.chartConf.series}
          value={this.chartConf.value}
          name={this.chartConf.name}
          innerRadius={this.chartConf.innerRadius}
        />

      </ProgressClock>,
      document.getElementById('progress-clock')
    );
  }

  /**
    Alternate colors for intervals in sequence

    @method updateRadialColor
    @private
  */
  updateRadialColor = (sequenceItem) => {
    this.chartConf.series[1].color = sequenceItem && sequenceItem.rest ? radialColors.alternative : radialColors.primary;
  }

  /**
    Evaluate the interval sequence and update the progress and task counts accordingly

    @method updateCount
    @private
  */
  updateCount = (reset) => {
    let timer = this.timer;
    let totalTasks = Session.find('totalTasks');

    // Advance progress count
    this.progressCount = reset ? totalTasks : this.progressCount + 1;

    // Find the current interval in the sequence based on the progress count
    let currentSequenceInterval = Session.find('sequence')[this.progressCount];

    // Apply the next interval in the sequence
    if (!reset && totalTasks >= this.taskCount && this.taskCount > 1) {
      // Only when rest is enabled
      if (Session.find('shouldRest')) {
        // Alternate colors
        this.updateRadialColor(currentSequenceInterval);

        // Save the udpated interval in the model
        Session.save('interval', currentSequenceInterval.value);

        // Update the timer with new interval
        timer.start(currentSequenceInterval.value);

        // Pulsate rest duration
        this.renderRestDuration(currentSequenceInterval.rest);
      } else {
        // Rest is disabled, advance as usual
        timer.start();
        this.progressCount = this.progressCount + 1;
      }
    } else {
      // Task is complete, reset task count
      this.progressCount = 0;
      this.taskCount = totalTasks;
      this.updateTaskProgress(0, totalTasks);
    }

    // For non-rest intervals, update the task count and render accordingly
    if (!reset && currentSequenceInterval && !currentSequenceInterval.rest) {
      this.taskCount = this.taskCount - 1;
      this.updateTaskProgress(100 - (((this.taskCount - 1) / totalTasks) * 100), this.taskCount);
    }
  }

  /**
   Render the progress bar and the updated task count components

   @method updateTaskProgress
   @private
  */
  updateTaskProgress = (percentage, count) => {
    this.renderProgressBar(percentage);
    this.renderTaskCount(count);
  }

  /**
    Render the task count component

    @method renderTaskCount
    @private
  */
  renderTaskCount = (count) => {
    ReactDOM.render(
      <TaskCount
        count={count}
      />,
      document.getElementById('task-count')
    );
  }

  /**
    Render the progress bar component

    @method renderProgressBar
    @private
  */
  renderProgressBar = (percentage) => {
    ReactDOM.render(
      <ProgressBar
        percentage={percentage}
      />,
      document.getElementById('progress-bar')
    );
  }

  /**
    Render the progress controls component

    @method renderControls
    @private
  */
  renderControls = () => {
    let timer = this.timer;

    ReactDOM.render(
      <ProgressControls
        timer={timer}
       />,
      document.getElementById('progress-controls')
    );
  }

  /**
    Render the rest duration component which displays the current duration of the rest interval

    @method renderRestDuration
    @private
  */
  renderRestDuration = (resting) => {
    ReactDOM.render(
      <RestDuration
        duration={Session.find('restInterval')}
        shouldRest={Session.find('shouldRest')}
        pulsate={resting ? 'pulsate' : ''}
      />,
      document.getElementById('rest-duration')
    );
  }

  /**
    Render the routine form component

    @method _renderRoutineForm
    @private
  */
  renderRoutineForm = () => {
    let timer = this.timer;
    ReactDOM.render(
      <RoutineForm
        timer={timer}
        units='seconds'
        controller={this}
        />,
      document.getElementById('routine-form')
    );
  }

  /**
    Render the theme picker component

    @method renderThemes
    @private
  */
  renderThemes = () => {
    ReactDOM.render(
      <ThemePicker />,
      document.getElementById('theme-picker')
    );
  }

  /**
    Initialize the radial progress modules

    @method init
    @private
  */
  init = () => {
    // Initialize this session
    Session.init();
    // setup chart class
    this.renderChart();
    // renders task count
    this.renderTaskCount(Session.find('totalTasks'));
    // renders progress bar
    this.renderProgressBar(0);
    // renders controls
    this.renderControls();
    // renders settings
    this.renderRoutineForm();
    // renders themes
    this.renderThemes();
    // renders the clock
    this.updateClock(-1);
    // renders rest duration
    this.renderRestDuration();
  }
};

export default RoutineController;
