import React, { Component } from "react";
import * as d3 from "d3";
import { makeTester } from "./performance";
import test from "./test";
import "./index.scss";

export default class Performance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testResults: [],
      size: 300,
      count: 1000
    };
  }

  setSVGRef = ref => (this.svgRef = ref);

  handleChange = event => {
    this.setState({ count: event.target.value });
  };

  handleClick = event => {
    const { count, size } = this.state;
    const svg = d3.select(this.svgRef);
    const tester = makeTester();
    const testResults = test({ tester, svg, count, size });
    console.log(testResults);
    this.setState({ testResults });
  };

  render() {
    const { testResults, size, count } = this.state;
    return (
      <div className="Performance">
        <div className="test">
          <h2>D3.js performance test</h2>
          <div className="iterations">
            <span>Count of elements you want to render:</span>
            <strong>{count}</strong>
            <input
              onChange={this.handleChange}
              type="range"
              min="100"
              max="100000"
              step="100"
              value={count}
            />
          </div>
          <button onClick={this.handleClick}>RUN TEST</button>
          <h3>Click "RUN TEST" button and wait for Results: </h3>
          <div className="result">
            <h4>{testResults.title}</h4>
            {testResults.items &&
              testResults.items.map((item, i) => (
                <p key={i}>
                  {item.desc}: <strong>{item.time}</strong> ms
                </p>
              ))}
          </div>
        </div>
        <div className="vis">
          <h2>Here svg chart content: </h2>
          <svg ref={this.setSVGRef} style={{ width: size, height: size }} />
        </div>
      </div>
    );
  }
}
