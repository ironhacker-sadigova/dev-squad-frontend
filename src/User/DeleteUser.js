import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { removeUser } from "./apiUser";
import { signout } from "../auth";

class DeleteUser extends Component {
    state = { // by default value false, and when we successfuly change the user
        //we will change it to TRUE 
        redirect: false
    };


    // Delete account will delete according to users input on the question
    // if the user confirms to delete 

    // ok or cancel
    deleteAccount = () => {

        // we need the token & then we can remove 
        const token = isAuthenticated().token; 

// we need to send the userID & we can get it from Profile

        const userId = this.props.userId;

// to remove we just get the data 

        removeUser(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {

//we will signout the user && redirect with the state by setting it to false by default
                signout(() => console.log("Account deleted"));
                
                this.setState({ redirect: true });
            }
        });
    };

    // if user says ok, we delete the account
    // if answer we execute another methode & delete the Account
    userDeleteConfirmation = () => {
        let answer = window.confirm(
            "Are you sure to quit the elite?"
        );
        if (answer) {
            this.deleteAccount();
        }
    };

    render() {
        if (this.state.redirect) { // if true we go to the Home Page & sign them out 
            return <Redirect to="/" />;
        }
        return (
         
              <button className="" onClick={this.userDeleteConfirmation}>
                                        Delete Profile
                                    </button>
        );
    }
}

export default DeleteUser;