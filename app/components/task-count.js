import React from 'react';

/**
  Renders the task count

  @class TaskCount
  @extends React Component
  @private
*/
class TaskCount extends React.Component {
  super(props) {
    this.count = props.count;
  }

  count = 0;

  /**
    Render task count

    @method render
    @private
  */
  render() {
    return (
      <div className='task-count'>
        <div className='count'>{this.count}</div>
      </div>
    );
  }
};

export default TaskCount;
