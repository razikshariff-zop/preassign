import { Component } from "react";

class StockTicker extends Component {
  constructor(props) {
    super(props);
    this.state = { price: props.initialPrice };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only re-render if price changes
    return nextState.price !== this.state.price;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.price !== this.state.price) {
      console.log(`Stock updated from ${prevState.price} → ${this.state.price}`);
    }
  }

  updatePrice = () => {
    // Simulate new price
    const newPrice = (Math.random() * 100).toFixed(2);
    this.setState({ price: newPrice });
  };

  render() {
    return (
      <div>
        <h2>Stock Price: ${this.state.price}</h2>
        <button onClick={this.updatePrice}>Update Price</button>
      </div>
    );
  }
}
export default StockTicker