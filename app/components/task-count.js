import React from 'react';

/**
  Renders the task count

  @class TaskCount
  @extends React Component
  @private
*/
class TaskCount extends React.Component {
  /**
    Render task count

    @method render
    @private
  */
  render() {
    return (
      <div className='task-count'>
        <div className='count'>{this.props.count}</div>
      </div>
    );
  }
};

export default TaskCount;
