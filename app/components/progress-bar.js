import React from 'react';

/**
  Renders the radial progress Bar

  @class ProgressBar
  @extends React Component
  @private
*/
class ProgressBar extends React.Component {
  /**
    Render radial progress chart and Bars

    @method render
    @private
  */
  render() {
    return (
      <progress className='progress is-small' value={this.props.percentage} max='100'>{this.props.percentage}%</progress>
    );
  }
};

export default ProgressBar;
