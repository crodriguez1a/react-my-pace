// TODO Deprecate in favor of Redux implementation
import ls from 'local-storage';
import Routine from './../services/routine';

export const Tester = class extends Routine {
  constructor(props) {
    super(props);
  }

  name = 'Tester';

  totalTasks = 8;

  taskCount = 8;

  shouldRest = true;

  showNext = true;

  withSound = true;

  restInterval = 3

  interval = 5;

  sequence = [];

  theme = ls('theme') || 'focus';

  showAllThemes = false;
};

export const ShortTabata = class extends Routine {
  constructor(props) {
    super(props);
  }

  name = 'ShortTabata';

  totalTasks = 8;

  taskCount = 8;

  shouldRest = true;

  showNext = true;

  withSound = true;

  restInterval = 10
  interval = 20;

  sequence = [];

  theme = ls('theme') || 'summer';

  showAllThemes = false;
};

export const Boxing12Rounds = class extends Routine {
  constructor(props) {
    super(props);
  }

  name = 'Boxing12Rounds';

  totalTasks = 12;

  taskCount = 12;

  shouldRest = true;

  showNext = false;

  withSound = true;

  restInterval = 30

  interval = 180;

  sequence = [];

  theme = ls('theme') || 'focus';

  showAllThemes = false;
};

export const Presets = (routine) => {
  let map = {
    ShortTabata,
    Boxing12Rounds
  };
  return new map[routine]();
};
