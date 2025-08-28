import { Component } from "react";

class UserList extends Component {
    constructor(prop) {
        super(prop)
        this.state = { users: [] }
    }

componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => this.setState({ users: data }));
  }

    render() {
        return (
            <div>
                <h2>Users:</h2>
                <ul>
                    {this.state.users.map(user => (
                        <li key={user.id}>{user.name} ({user.email})</li>
                    ))}
                </ul>
            </div>
        )
    }
}
export default UserList



