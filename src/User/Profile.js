import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { Redirect,Link } from "react-router-dom";
import {read} from "./apiUser"; //; to connect to the back
import Avatar from '../images/avatar.png';
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";
// We will create a state with user & redirect 
// if not loged in user redirect to signin 
// set the state to false by default 
import { showPostsByUser } from "../Post/apiPost";

class Profile extends Component {
    
    constructor() {
        super();
        this.state = {
            user: { following: [], followers: []},
            redirectToSignin: false,
            following:false,
            error:"",
            posts:[]
        };
    }

  // check follow 
  // IT WILL CHECK & RETURN FALSE OR TRUE 
  // Check if the user in the state has followers and we find each follower 
  // Then we return follower._id === jwt.user._id & match which will be either true or false

  checkFollow = user => {
    const jwt = isAuthenticated();
    const match = user.followers.find(follower => {
        return follower=== jwt.user;
    });
    return match;
};

// WILL TAKE AN ARGUMENT SO A FUNCTION
// WILL DO A POST REQUEST TO THE BACKEND 
// IT WILL BE CREATED IN THE API USER
// PARENT COMPONENT AND NOT CHILD IN ORDER TO BE ABLE TO CHANGE THE STATE
clickFollowButton = callApi => {// either follow or unfollow
    const userId = isAuthenticated().user._id; //grab user id
    const token = isAuthenticated().token;

    callApi(userId, token, this.state.user._id)
    .then(data => {
        if (data.error) {
            this.setState({ error: data.error });
        } else {
            this.setState({ user: data, following: !this.state.following });
        }
    });
};



    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToSignin: true });
            } else {
                let following = this.checkFollow(data);
                this.setState({ user: data, following });
                this.showPosts(data._id)
            }
        });
    };

    showPosts = userId => {
        const token = isAuthenticated().token;
        showPostsByUser(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
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
        const { redirectToSignin, user,posts } = this.state;
        if (redirectToSignin) return <Redirect to="/signin" />;
    
    
        const photoUrl = user._id|| ""
        ? `${process.env.REACT_APP_API_URL|| ""}/user/photo/${
              user._id
          }?${new Date().getTime()}`
        : Avatar;

       return (
              <div className="user-profile-card">
                <div className="user-profile-header">
                </div>
                <div className="user-profile-avatar text-center">
                        
                <img
                            style={{ height: "200px", width: "auto" }}
                            className="profile"
                            src={photoUrl}
                            onError={i => (i.target.src = `${Avatar}`)}
                            alt={user.name}
                        />                        
                             </div>
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
                            isAuthenticated().user._id === user._id ? (

                                
                                <div className="">
                                
                                    <Link
                                        
                                        to={`/user/edit/${user._id}`}
                                    >
                                       

                                       <div className="row">
                   
                  


                        <textarea className="form-control"  type="text"  id="about"  required value={user.about} />




                    </div>
                

                                <Link
                                    className=" "
                                    to={`/post/create`}
                                >
                                  <button className=""> Create Post</button> 
                                </Link>
                                       
                                    <button className="">
                                       Edit Profile
                                    </button>
                                    </Link>
                                    <DeleteUser userId={user._id}/>

                                     
                                    
                                </div>

                                
                            ): (<FollowProfileButton following={this.state.following}
                            onButtonClick={this.clickFollowButton}/>)}
                

                  <ProfileTabs followers={user.followers} following={user.following} posts={posts}/>

                </div>
        );
    }
}

export default Profile;