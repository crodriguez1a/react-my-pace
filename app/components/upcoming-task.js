import React from 'react';

/**
  Render titles of current task and upcoming task

  @class UpcomingTask
  @extends React Component
  @private
*/
class UpcomingTask extends React.Component {
  constructor(props) {
    super(props);
    this.currentTask = props.currentTask;
    this.upcomingTask = props.upcomingTask;
  }

  currentTask = '';

  upcomingTask = '';

  render() {
    return (
      <div>
        <h1 className='title is-4 current'><i className='icon typcn typcn-arrow-sync'></i> {this.currentTask}</h1>
        <h1 className='title is-5 upcoming'><i className='icon typcn typcn-arrow-right'></i> {this.upcomingTask}</h1>
      </div>
    );
  }
};

export default UpcomingTask;
