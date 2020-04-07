import React, { Component } from "react";
import { list } from "./apiPost";
import {Link} from "react-router-dom";
//import Avatar from '../images/avatar.png';
//import DevBackground from "../images/usersprofile-background.jpeg";



// WILL BE NEARLY THE SAME AS USERS 
// JUST CHANGING REF TO USER WITH POST
// LIST METHOD FROM API POST NOT USER 

class Posts extends Component {
    constructor() {
        super();
        this.state = { // to store all the posts & make them available in the state 
           posts: [] // empty array to begin 
        };
    }
// in modern JS no need to write the word "function"
    componentDidMount() {
        list().then(data => { // execute a methode which will list all the users & handle data , the method is in the API user 
            if (data.error) { // if any error show it or set the state 
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    }


    renderPosts = posts => (
        <div className="">
            {posts.map((post, i) => (
                <div className="row" key={i}>
                <figure className="snip1336">



  <figcaption>
    


    <h2>{post.title} </h2>
    <p> {post.body} </p>
   
    <Link to={`/posts/${post._id}`}> View more </Link> 
                        
                            
  </figcaption>
</figure>
                </div>
            ))}
        </div>
    );

// loop through users
    render() {
        const { posts } = this.state; 
        return (
            <div className="container">
                <h2 className="mt-5 mb-5"> Posts </h2>
            {this.renderPosts(posts)}
            </div>
        );
    }
}
export default Posts;

      /*          <img
                    src={DevBackground}
                    />
*/

/*<img
                        
                        className="profile" style={{width:"100vh"}}
                        src={`${process.env.REACT_APP_API_URL|| ""}/user/photo/${
                            user._id
                        }`}
                        onError={i => (i.target.src = `${Avatar}`)}
                        alt={user.name}
                    />*/