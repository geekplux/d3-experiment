import React, { Component } from "react";
import * as d3 from "d3";
import "./index.scss";

function tester({ iterations, testFn, setupFn, teardownFn }) {
  return function(name, args) {
    console.time(name);
    var i = 0;
    for (;i<iterations;i++) {
      if (setupFn) {
        setupFn(args);
      }
      // Run the function
      testFn(args);
      if (teardownFn) {
        teardownFn(args);
      }
    }
    console.timeEnd(name);
  }
}

function cleanup({ svg }) {
  svg.node().innerHTML = '';
}


function renderD3({ data, key, xAccsessor, svg }) {
  [].concat(data).forEach(function(_data) {
    const circ = svg.selectAll("circle").data(_data, key);
    circ
      .enter()
      .append("circle")
      .attr({ cx: 50, cy: 50, r: 50, fill: "black" });
    circ.attr("fill", "red").attr("cx", xAccsessor);
    circ.exit().remove();
  });
}

export default class Performance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iterations: 100
    };
  }

  setSVGRef = ref => (this.svgRef = ref);

  handleChange = event => {
    this.setState({ iterations: event.target.value });
  };

  componentDidMount() {
    const { iterations } = this.state;
    const svg = d3.select(this.svgRef);
    const data = d3.range(0, 1000);
    const testCase = tester({ iterations, testFn: renderD3, setupFn: cleanup, teardownFn: cleanup });
    const time = testCase('JS int join', { svg, data: [ data ], key: null, accessor: null });
  }

  render() {
    const { iterations } = this.state;
    return (
      <div className="Performance">
        <div className="iterations">
          <span>Iterations count of test function:</span>
          <strong>{iterations}</strong>
          <input
            onChange={this.handleChange}
            type="range"
            min="100"
            max="1000"
            step="10"
            value={iterations}
          />
        </div>
        <svg ref={this.setSVGRef} />
      </div>
    );
  }
}
