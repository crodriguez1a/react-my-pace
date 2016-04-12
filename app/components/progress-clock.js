import React from 'react';

/**
  Renders the radial progress clock

  @class ProgressClock
  @extends React Component
  @private
*/
class ProgressClock extends React.Component {
  /**
    Render radial progress chart and clocks

    @method render
    @private
  */
  render() {
    return (
      <div className='progress-clock'>
        <div className='progress-time'>{this.props.clock}</div>
        {this.props.children}
      </div>
    );
  }
};

export default ProgressClock;
