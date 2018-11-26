import React, { Component } from "react";
import * as d3 from "d3";
import { makeTester } from "./performance";
import testCases from "./testCases";
import "./index.scss";

function runTest(tester, svg) {
  const results = [];
  testCases.map(test => {
    const spec = test(tester, svg);
    results.push(spec);
  });
  return results;
}

export default class Performance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iterations: 100,
      testResults: [],
    };
  }

  setSVGRef = ref => (this.svgRef = ref);

  handleChange = event => {
    this.setState({ iterations: event.target.value });
  };

  componentDidMount() {
    const { iterations } = this.state;
    const svg = d3.select(this.svgRef);
    const tester = makeTester({ iterations });
    const testResults = runTest(tester, svg);
    this.setState({ testResults });
  }

  render() {
    const { iterations } = this.state;
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
        <svg ref={this.setSVGRef} />
      </div>
    );
  }
}
