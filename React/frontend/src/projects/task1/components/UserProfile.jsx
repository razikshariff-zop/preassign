import React, { Component } from "react";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        // Multiple state variables
        this.state = {
            name: "",
            age: 25,
            email: "alice@example.com",
            isOnline: false
        };
    }
    handleChange = (e) => {
        this.setState({ name: e.target.value });
    };
    // Event handlers to update state
    toggleOnlineStatus = () => {
        this.setState({ isOnline: !this.state.isOnline });
    };

    increaseAge = () => {
        this.setState({ age: this.state.age + 1 });
    };

    changeName = () => {
        this.setState({ name: "Bob" });
    };

    render() {
        const { name, age, email, isOnline } = this.state;

        return (<>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Enter your name"
        />
            <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
                <h2>User Profile</h2>
                <p>Name: {this.state.name || "stranger"}</p>
                <p>Age: {age}</p>
                <p>Email: {email}</p>
                <p>Status: {isOnline ? "Online" : "Offline"}</p>

                <button onClick={this.toggleOnlineStatus}>
                    {isOnline ? "Go Offline" : "Go Online"}
                </button>
                <button onClick={this.increaseAge}>Increase Age</button>
                <button onClick={this.changeName}>Change Name</button>
            </div></>
        );
    }
}

export default UserProfile;
