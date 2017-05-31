import React from 'react';

/**
  Renders the radial progress clock

  @class ProgressClock
  @extends React Component
  @private
*/
class RestDuration extends React.Component {
  constructor(props) {
    super(props);

    this.shouldRest = props.shouldRest;
    this.pulsate = props.pulsate;
  }

  shouldRest = false;

  pulsate = false;


  /**
    Render rest duration component

    @method render
    @private
  */
  render() {
    return (
      <ul>
        <li className='label'>
          <i className={`fa typcn typcn-social-flickr ${this.shouldRest ? '' : 'hide'}`}></i>
          <i className={`fa typcn typcn-flash ${this.shouldRest ? 'hide' : ''}`}></i>
        </li>
        <li className={`duration ${this.pulsate ? 'pulsate' : 'hide'} ${this.shouldRest ? '' : 'hide'}`}>REST</li>
      </ul>
    );
  }
};

export default RestDuration;
