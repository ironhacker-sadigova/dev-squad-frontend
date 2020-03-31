

import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";





// We will create a state with user & redirect 
// if not loged in user redirect to signin 
// set the state to false by default 
class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            redirectToSignin: false
        };
    }

    //We want to get user info from the backend
    // We need to grab User id & do a get request to the backend
    // when the component is mounted, then we will get userId
    // we have info in the local Storage about the user
    //in auth index there is a method is Authenticated we can use it
    // if authenticated get name etc & populate
    // we need to send the token in the header so we use it 
    // we are going to send the content-type, a json app
    // we need to put the Autorization Header 
    componentDidMount() {
        const userId = this.props.match.params.userId;
        //domain name & user & userId
        // we will get user info when we will make a request to this link

        fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        })
            .then(response => { // not resolved yet ,  a promise object that is trying to give a response
                // we are not handling here
                // we can return response.json to handle response
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    this.setState({ redirectToSignin: true });
                } else {
                    this.setState({ user: data });
                }
            });
    }

    render() {
        const redirectToSignin = this.state.redirectToSignin;
        if (redirectToSignin) return <Redirect to="/signin" />;

        return (
            <div className="">
                <h2 className="">Profile</h2>
                <p>Hello {isAuthenticated().user.name}</p>
                <p>Email: {isAuthenticated().user.email}</p>
                <p>{`Joined ${new Date(
                    this.state.user.created
                ).toDateString()}`}</p>
            </div>
        );
    }
}

export default Profile;
