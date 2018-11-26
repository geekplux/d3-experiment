import React, { Component } from "react";
import './index.scss';

export default class Performance extends Component {
  constructor (props) {
    super(props);
    this.state = {
      iterations: 100,
    };
  }

  handleChange = (event) => {
    this.setState({iterations: event.target.value});
  }

  render() {
    const { iterations } = this.state;
    return (
      <div className="Performance">
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
    );
  }
};
