import React, { Component, Fragment } from "react";
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
      iterations: 50,
      testResults: [],
    };
  }

  setSVGRef = ref => (this.svgRef = ref);

  handleChange = event => {
    this.setState({ iterations: event.target.value });
  }

  handleClick = event => {
    const { iterations } = this.state;
    const svg = d3.select(this.svgRef);
    const tester = makeTester({ iterations });
    const testResults = runTest(tester, svg);
    this.setState({ testResults });
  }

  render() {
    const { iterations, testResults } = this.state;
    return (
      <div className="Performance">
        <h2>D3.js + Immutable.js performance test</h2>
        <div className="iterations">
          <span>Iterations count of test function:</span>
          <strong>{iterations}</strong>
          <input
            onChange={this.handleChange}
            type="range"
            min="10"
            max="1000"
            step="10"
            value={iterations}
          />
          <button onClick={this.handleClick}>RUN TEST</button>
        </div>
        <h3>Results: </h3>
        {testResults && testResults.map((result, i) => (
          <div className="result" key={i}>
            <h4>{result.title}</h4>
            {result.items && result.items.map((item, j) => (
              <p>{item.desc}: <strong>{item.time}</strong></p>
            ))}
          </div>
        ))}
        <svg ref={this.setSVGRef} />
      </div>
    );
  }
}
