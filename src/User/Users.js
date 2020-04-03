
    import React, { Component } from "react";
    import { list } from "./apiUser";
    import {Link} from "react-router-dom";
    
    
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
        
        renderUsers = users => (
            <div className="">
                {users.map((user, i) => (
                    <div className="row" key={i}>
                    <figure className="snip1336">
      <img src="https://images.unsplash.com/photo-1504190914346-e26a4e1d0ec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="sample87" />
      <figcaption>
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample4.jpg" alt={user.name} className="profile" />
        <h2>{user.name} </h2>
        <p> {user.email} </p>
        
        <Link to={`/user/${user._id}`}> View Profile</Link> 
    
      </figcaption>
    </figure>
                        
                       
                    </div>
                ))}
            </div>
        );
    
    
    
    
    
    // loop through users
        render() {
            const { users } = this.state; 
            return (
                <div className="">
                    <h2 className="mt-5 mb-5"> Who is in the squad ? </h2>
    
                {this.renderUsers(users)};
                </div>
            );
        }
    }
    
    export default Users;
