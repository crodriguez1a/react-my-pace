import React from 'react';

/**
  Renders the radial progress clock

  @class ProgressClock
  @extends React Component
  @private
*/
class RestDuration extends React.Component {
  /**
    Render rest duration component

    @method render
    @private
  */
  render() {
    return (
      <ul>
        <li className='label'>
          <i className={`fa typcn typcn-social-flickr ${this.props.shouldRest ? '' : 'hide'}`}></i>
          <i className={`fa typcn typcn-flash ${this.props.shouldRest ? 'hide' : ''}`}></i>
        </li>
        <li className={`duration ${this.props.pulsate ? 'pulsate' : 'hide'} ${this.props.shouldRest ? '' : 'hide'}`}>REST</li>
      </ul>
    );
  }
};

export default RestDuration;
