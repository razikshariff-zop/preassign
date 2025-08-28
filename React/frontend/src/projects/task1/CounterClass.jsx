import React, { Component } from "react";

class CounterClass extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  componentDidMount(){
    console.log("mounted")
  }
  componentDidUpdate(){
    console.log("component updated")
  }
  componentWillUnmount(){
    console.log("unmounted")
  }
  render() {
    return (
      <div style={{ margin: "20px", padding: "10px", border: "1px solid gray" }}>
        <h2>Counter (Class Component)</h2>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default CounterClass;
