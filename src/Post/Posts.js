import React, { Component } from "react";
import { list } from "./apiPost";
import {Link} from "react-router-dom";
import PostBackground from "../images/postbackgroundbydefault.jpeg";
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

    renderPosts = posts => {
        return (
            <div className="flexrow">
                {posts.map((post, i) => {
                    const posterId = post.postedBy // userId of the one who posted the post
         ? `/user/${post.postedBy._id}`// if yes we can get the id
        : ""; 
                 const posterName = post.postedBy // The one who posted
                        ? post.postedBy.name // if we have the name we get them otherwise
                        : " Unknown"; // UNKNOWN USER 
    return (
        <div className="">
                <div className="row" key={i}>
                <figure className="snip1336 ">



<img classname ="postimg" style={{height:"250px", width: "100%"}}
        src={`${ process.env.REACT_APP_API_URL|| ""}/post/photo/${post._id}`} alt={post.title}
        onError={i => (i.target.src = `${PostBackground}`) }

                                />





  <figcaption>
    


    <h2>{post.title} </h2>
    <p> {post.body.substring(0, 100)} </p> 
   
    

 <p className="">
  Posted by {" "} 
         <Link to={`${posterId}`}>
                {posterName} {" "}
        </Link> 

        <p>
  on {new Date(post.created).toDateString()}</p>
                                </p>




    <Link to={`/post/${post._id}`}> View more </Link> 
                        
                            
  </figcaption>
</figure>
                </div>
            
        </div>

 
                            
                    );
                })}
            </div>
        );
    };




// loop through posts
    render() {
        const { posts } = this.state; 
        return (
            <div className="container">
                <h2 className="mt-5 mb-5"> What's new in the squad? </h2>
            {this.renderPosts(posts)}
            </div>
        );
    }
}
export default Posts;

   
/*<img
                        
                        className="profile" style={{width:"100vh"}}
                        src={`${process.env.REACT_APP_API_URL|| ""}/user/photo/${
                            user._id
                        }`}
                        onError={i => (i.target.src = `${Avatar}`)}
                        alt={user.name}
                    />*/