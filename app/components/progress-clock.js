import React from 'react';

/**
  Renders the radial progress clock

  @class ProgressClock
  @extends React Component
  @private
*/
class ProgressClock extends React.Component {
  constructor(props) {
    super(props);

    this.clock = props.clock;
    this.children = props.children;
  }

  public clock = null;

  public children = null;

  /**
    Render radial progress chart and clocks

    @method render
    @private
  */
  render() {
    return (
      <div className='progress-clock'>
        <div className='progress-time'>{this.clock}</div>
        {this.children}
      </div>
    );
  }
};

export default ProgressClock;
