import React from 'react';
import ReactDOM from 'react-dom';
import { Chart } from 'react-d3-core';
import { PieChart } from 'react-d3-basic';

const RadialProgress = {
  /**

  */
  config: {
    title: 'Hello World',
    data: [
      {
        name: 'time',
        value: '75'
      },
      {
        name: 'remaining',
        value: '25'
      }
    ],
    width: 700,
    height: 400,
    name(d) {
      return d.name;
    },
    value(d) {
      return d.value;
    },
    series: [
      {
        "field": "remaining",
        "name": "remaining",
        color: "#252C3D"
      },
      {
        "field": "time",
        "name": "time",
        color: "#F15152"
      }
    ],
    innerRadius: 200
  },

  /**

  */
  _generate() {
    let conf = this.config;

    ReactDOM.render(
      <PieChart
        title={conf.title}
        data= {conf.data}
        width= {conf.width}
        height= {conf.height}
        chartSeries= {conf.series}
        value = {conf.value}
        name = {conf.name}
        innerRadius = {conf.innerRadius}
      />, document.getElementById('data_donut')
    );
  },
  init() {
    this._generate();
  }
};

export default RadialProgress;
