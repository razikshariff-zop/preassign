import React, { Component } from "react";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: ["Welcome to the chat! 👋"],
      newMessage: ""
    };
  }

  // Handle input change
  handleChange = (e) => {
    this.setState({ newMessage: e.target.value });
  };

  // Add message to state
  sendMessage = () => {
    if (this.state.newMessage.trim() === "") return;

    this.setState((prevState) => ({
      messages: [...prevState.messages, prevState.newMessage],
      newMessage: ""
    }));
  };

  // Scroll to bottom when new messages are added
  componentDidUpdate(prevProps, prevState) {
    if (prevState.messages.length < this.state.messages.length) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    this.chatEnd.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    return (
      <div>
        <div
          style={{
            height: "200px",
            overflowY: "auto",
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          {this.state.messages.map((msg, i) => (
            <p key={i}>{msg}</p>
          ))}
          <div ref={(el) => (this.chatEnd = el)} />
        </div>

        <input
          type="text"
          value={this.state.newMessage}
          onChange={this.handleChange}
          placeholder="Type a message..."
        />
        <button onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
}

export default ChatBox;
