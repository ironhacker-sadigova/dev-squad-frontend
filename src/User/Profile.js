import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect,Link } from "react-router-dom";
import {read} from "./apiUser"; //; to connect to the back
import Avatar from '../images/avatar.png';
import DeleteUser from "./DeleteUser";
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
    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToSignin: true });
            } else {
                this.setState({ user: data });
            }
        });
    };
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
        this.init(userId)
       /* fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
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
            }); */
    }
    // when we navigate around the component will receive props
    // we need to grab that change and make a get request to the back 
    // we use componentWillReceiveProps available with router-react-dom
    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);
    }
   render() {
        const { redirectToSignin, user } = this.state;
        if (redirectToSignin) return <Redirect to="/signin" />;
       return (
              <div className="user-profile-card">
                <div className="user-profile-header">
                </div>
                <div className="user-profile-avatar text-center">
                        <img src={Avatar} alt={user.name} className="profile" />         </div>
                <div className="row">
                  <div className="text-center">
                    <h4> {user.name}</h4>
                    <small>{`Joined ${new Date(
                            user.created
                        ).toDateString()}`}</small>
                    <br />
                  <div className="container">
                    <p>
                      <small>{user.email}</small>
                    </p>
                    </div>
                  </div>
                </div>
                 {isAuthenticated().user &&
                            isAuthenticated().user._id === user._id && (
                                <div className="">
                                    <Link
                                        
                                        to={`/user/edit/${user._id}`}
                                    >
                                       
                                    <button className="">
                                       Edit Profile
                                    </button>
                                    </Link>
                                    <DeleteUser userId={user._id}/>
                                </div>
                            )}
                  
                </div>
        );
    }
}
/*
     <div className="col-md-6">
                        {isAuthenticated().user &&
                            isAuthenticated().user._id == user._id && (
                                <div className="d-inline-block mt-5">
                                    <Link
                                        className="btn btn-raised btn-success mr-5"
                                        to={`/user/edit/${user._id}`}
                                    >
                                        Edit Profile
                                    </Link>
                                    <button className="btn btn-raised btn-danger">
                                        Delete Profile
                                    </button>
                                </div>
                            )}
                    </div>
                </div>
            </div>
            
        );
    }
}
*/
export default Profile;