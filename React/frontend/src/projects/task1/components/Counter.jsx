import React, { Component } from "react";

// Child component
class Display extends Component {
  render() {
    return <h2>The count is: {this.props.count}</h2>;
  }
}

// Parent component
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <Display count={this.state.count} /> {/* passing state as prop */}
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;
