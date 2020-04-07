import React, { Component } from "react";
import { findPeople } from "./apiUser";
import {Link} from "react-router-dom";
import Avatar from '../images/avatar.png';
import DevBackground from "../images/usersprofile-background.jpeg";
import {isAuthenticated} from '../auth';
import {follow} from './apiUser';


class FindPeople extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            error: "",
            open: false
        };
    }

 

 componentDidMount() {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        findPeople(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }

    clickFollow = (user, i) => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        follow(userId, token, user._id).then(data => {
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                let toFollow = this.state.users;
                toFollow.splice(i, 1);
                this.setState({
                    users: toFollow,
                    open: true,
                    followMessage: `Following ${user.name}`
                });
            }
        });
    };
    
    renderUsers = users => (
        <div className="">
            {users.map((user, i) => (
                <div className="row" key={i}>
                <figure className="snip1336">

                <img
                    src={DevBackground}
                    />



  <figcaption>
    

  <img
                        
                        className="profile" style={{width:"100vh"}}
                        src={`${process.env.REACT_APP_API_URL|| ""}/user/photo/${
                            user._id
                        }`}
                        onError={i => (i.target.src = `${Avatar}`)}
                        alt={user.name}
                    />

    <h2>{user.name} </h2>
    <p> {user.email} </p>
    <Link to={`/user/${user._id}`}> View Profile</Link> 
                            <button
                        onClick={() => this.clickFollow(user, i)}
                        className="btn  float-right btn-sm" >
                        Follow
                        </button>
                            
  </figcaption>
</figure>
                </div>
            ))}
        </div>
    );

    render() {
        const { users, open, followMessage } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5"> Who to follow?</h2>

                {open && (
                    <div className="alert alert-success">{followMessage}</div>
                )}

                {this.renderUsers(users)}
            </div>
        );
    }
}

export default FindPeople;

   

