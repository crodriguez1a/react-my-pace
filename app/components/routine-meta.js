import React from 'react';
import moment from 'moment';

/**
  Renders routine metadata, including title and total time

  @class RoutineMeta
  @extends React Component
  @private
*/
class RoutineMeta extends React.Component {
  constructor(props) {
    super(props);
  }

  get formattedElapsed() {
    let elapsed = moment.duration(this.props.elapsed);
    return `${elapsed.minutes()}:${elapsed.seconds()}`;
  }

  /**
    Render routine metadata

    @method render
    @private
  */
  render() {
    return (
      <ul>
        <li className='title'>{this.props.name}</li>
        <li className='total-time'>{this.formattedElapsed}</li>
      </ul>
    );
  }
};

export default RoutineMeta;
