import React from 'react';

/**
  Render titles of current task and upcoming task

  @class UpcomingTask
  @extends React Component
  @private
*/
class UpcomingTask extends React.Component {
  render() {
    return (
      <div>
        <h1 className='title is-4 current'><i className='icon typcn typcn-arrow-sync'></i> {this.props.currentTask}</h1>
        <h1 className='title is-5 upcoming'><i className='icon typcn typcn-arrow-right'></i> {this.props.upcomingTask}</h1>
      </div>
    );
  }
};

export default UpcomingTask;
