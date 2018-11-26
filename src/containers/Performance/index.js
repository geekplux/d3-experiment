import React, { Component } from "react";
import * as d3 from "d3";
import { tester } from './performance';
import "./index.scss";

export default class Performance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iterations: 100,
      JSIntTime: {},
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
    const testCase = tester({ iterations });
    const _default = testCase('JS int join', { svg, data: [ data ], key: null, accessor: null });
    this.setState({ JSIntTime: { _default } });
  }

  render() {
    const { iterations, JSIntTime } = this.state;
    return (
      <div className="Performance">
        <h2>D3.js + Immutable.js performance test</h2>
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
        <h3>Results: </h3>
        <h4>Testing JavaScript Array with 1000 Integer elements</h4>
        <p>Default {JSIntTime._default}</p>
        <svg ref={this.setSVGRef} />
      </div>
    );
  }
}
