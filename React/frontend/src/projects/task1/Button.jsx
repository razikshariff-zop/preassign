import { Component } from "react";


class Button extends Component {

  render() {
    const theme = "red";
    const className = 'button-' + theme;
    return (
      <button className={className}>
        {this.props.theme}
      </button>
    );
  }
}
export default Button