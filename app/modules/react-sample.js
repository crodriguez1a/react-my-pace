import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

const ReactSample = {
  init() {
    let HelloWorld = React.createClass({
      render: function() {
        return (
          <p>
            { moment(this.props.date).format('hh:mm:ss') }
          </p>
        );
      }
    });

    // let RadialProgress = React.createClass({
    //   render: function() {
    //     return (
    //       <p></p>
    //     );
    //   }
    // });

    setInterval(function() {
      ReactDOM.render(
        <HelloWorld date={new Date()} />,
        document.getElementById('example')
      );

      // ReactDOM.render(
      //   <RadialProgress date={new Date()} />,
      //   document.getElementById('chart')
      // );
    }, 500);
  }
};

export default ReactSample;
