import React from 'react';
import ReactDOM from 'react-dom';
import { Chart } from 'react-d3-core';
import { PieChart } from 'react-d3-basic';

const RadialProgress = {
  config: {
    title: 'Hello World',
    csv: "age,population\n<5,2704659\n5-13,4499890\n14-17,2159981\n18-24,3853788\n25-44,14106543\n45-64,8819342\n≥65,612463",
    width: 700,
    height: 400,
    value(d) {
      return d.population;
    },
    name(d) {
      return d.age;
    },
    series: [
      {
        "field": "<5",
        "name": "less than 5"
      },
      {
        "field": "5-13",
        "name": "5 to 13"
      },
      {
        "field": "14-17",
        "name": "14 to 17"
      },
      {
        "field": "18-24",
        "name": "18 to 24"
      },
      {
        "field": "25-44",
        "name": "25 to 44"
      },
      {
        "field": "45-64",
        "name": "45 to 64"
      }
    ],
    innerRadius: 200
  },
  _generate() {

    let conf = this.config;
    let data = d3.csv.parse(conf.csv);

    ReactDOM.render(
      <PieChart
        title={conf.title}
        data= {data}
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
