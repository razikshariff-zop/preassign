import React from 'react'
import { Component } from 'react'

function App() {
    return (
        <div>
            <Products />
        </div>
    )
}

class Products extends Component {
    constructor(prop) {
        super(prop)
        this.state = { users: [] }
    }
    async componentDidMount() {
        console.log("mount")
        const url ="https://fake-json-api.mock.beeceptor.com/users"
        let response = await fetch(url)
        response = await response.json()
        console.log(response)
        this.setState({users:response})
    }
    render() {
        return (
            <div className='container'>
                <h2>Users:</h2>
                <ul>
                    {this.state.users.map(user => (
                        <li key={user.id}>{user.name} ({user.email})</li>
                    ))}
                </ul>
            </div >
        )
    }
}
export default App