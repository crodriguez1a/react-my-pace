// TODO Deprecate in favor of Redux
import ls from 'local-storage';

/**
  Supports session's routine instance

  @service Routine
  @returns Class
  @private
*/
class Routine {
  /**
    When shouldRest is on, intervals will alternate

    @method buildIntervalSequence
    @private
  */
  buildIntervalSequence = () => {
    let sequence = [];
    let resting = true;
    for (let i = 0;i < (this.totalTasks * 2) - 1;i++) {
      if (this.shouldRest) {
        resting = !resting;
        sequence.push({
          value: resting ? this.restInterval : this.interval,
          rest: resting
        });
      } else {
        sequence.push({
          value: this.interval,
          rest: false
        });
      }
    }

    // Store this sequence instance
    this.save('sequence', sequence);
  }

  /**
    Find a corresponding selection

    @method find
    @private
    @returns Any
  */
  find = (item) => {
    if (typeof this[item] === 'function') {
      return this[item].call(this);
    }

    return this[item];
  }

  /**
    Find a group of specified members and return a callback with all member values as params

    @method findAll
    @private
    @returns Function
  */
  findAll = (callback, ...items) => {
    let store = this;
    let all = [];
    items.map((item) => {
      all.push(store[item]);
    });
    return callback(...all);
  }

  /**
    Create or update a value for any selection

    @method save
    @private
  */
  save = (item, val) => {
    this[item] = val;
  }

  /**
    Save an item and also store it in local storage

    @method store
    @private
  */
  store = (item, val) => {
    this.save(item, val);
    ls(item, val);
  }

  /**
    Save a group of items in the current session's routine

    @method saveAll
    @private
  */
  saveAll = (obj) => {
    for (let i in obj) {
      this[i] = obj[i];
    }
  }

  init = () => {
    this.buildIntervalSequence();
  }
};

export default Routine;
