import ls from 'local-storage';
import Routine from './../services/routine';

export const Tester = class extends Routine {
  constructor(props) {
    super(props);
    this.name = 'Tester';
    this.totalTasks = 8;
    this.taskCount = this.totalTasks;
    this.shouldRest = true;
    this.showNext = true;
    this.withSound = true;
    this.restInterval = 3
    this.interval = 5;
    this.sequence = [];
    this.theme = ls('theme') || 'focus';
    this.showAllThemes = false;
  }
};

export const ShortTabata = class extends Routine {
  constructor(props) {
    super(props);
    this.name = 'ShortTabata';
    this.totalTasks = 8;
    this.taskCount = this.totalTasks;
    this.shouldRest = true;
    this.showNext = true;
    this.withSound = true;
    this.restInterval = 10
    this.interval = 20;
    this.sequence = [];
    this.theme = ls('theme') || 'summer';
    this.showAllThemes = false;
  }
};

export const Boxing12Rounds = class extends Routine {
  constructor(props) {
    super(props);
    this.name = 'Boxing12Rounds';
    this.totalTasks = 12;
    this.taskCount = this.totalTasks;
    this.shouldRest = true;
    this.showNext = false;
    this.withSound = true;
    this.restInterval = 30
    this.interval = 180;
    this.sequence = [];
    this.theme = ls('theme') || 'focus';
    this.showAllThemes = false;
  }
};

export const Presets = (routine) => {
  let map = {
    ShortTabata,
    Boxing12Rounds
  };
  return new map[routine]();
};
