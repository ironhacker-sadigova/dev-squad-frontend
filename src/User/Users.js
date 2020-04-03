import React, { Component } from "react";
import { list } from "./apiUser";

class Users extends Component {
    constructor() {
        super();
        this.state = { // to store all the users & make them available in the state 
            users: [] // empty array to begin 
        };
    }


// in modern JS no need to write the word "function"
    componentDidMount() {
        list().then(data => { // execute a methode which will list all the users & handle data , the method is in the API user 
            if (data.error) { // if any error show it or set the state 
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }

    render() {
        const { users } = this.state;
        return (
            <div className="">
                <h2 className="mt-5 mb-5"> Who is in the squad ? </h2>

                <div className="card">
                    {users.map((user, i) => (
                        <div key={i}>
                            <p>{user.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Users;