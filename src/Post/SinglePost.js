import React, { Component } from "react";
import {singlePost, deleteUserPost} from './apiPost';
import { Link, Redirect } from "react-router-dom";
import PostBackground from "../images/postbackgroundbydefault.jpeg";
import { isAuthenticated } from "../auth";


class SinglePost extends Component {
    state = {
        post: "" ,// by default empty
        redirectToHome:false
    };

// TO POPULATE THE STATE USING COMPONENTDIDMOUNT

componentDidMount = () => {
    const postId = this.props.match.params.postId
    singlePost(postId).then(data =>{
        if (data.error){
            console.log(data.error);
        } else{
this.setState({post: data});
        }
    }) ;
};


deletePost = () => {
    const postId = this.props.match.params.postId;
    const token = isAuthenticated().token;
    deleteUserPost(postId, token).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            this.setState({ redirectToHome: true });
        }
    });
};

deleteConfirmed = () => {
    let answer = window.confirm(
        " Delete Post? "
    );
    if (answer) {
        this.deletePost();
    }
};

renderPost = post => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";// userId of the one who posted the post
   // if yes we can get the id 
   const posterName = post.postedBy ? post.postedBy.name : " Unknown";// if we have the name we get them otherwise unknown


return (
<div className="singlePostContainer">
        <div className="rowSinglePost">
        <figure className="snip14">


<img classname ="postimg" style={{height:"250px", width: "100%"}}
src={`${ process.env.REACT_APP_API_URL|| ""}/post/photo/${post._id}`} alt={post.title}
onError={i => (i.target.src = `${PostBackground}`) } />

<figcaption>

<p> {post.body} </p> 

<p className="">
Posted by {" "} 
 <Link to={`${posterId}`}>
        {posterName} {" "}
</Link> 

<p>
on {new Date(post.created).toDateString()}</p>
                        </p>
<Link to={`/`}>  Back to posts  </Link> 

{isAuthenticated().user &&
                        isAuthenticated().user._id === post.postedBy._id && (
                            <>
                                
<Link to={`/post/edit/${post._id}`}>  Edit Post  </Link> 
                           
 <button style={{color:"white"}} onClick={this.deleteConfirmed} type="button" class="btn btn-outline-default waves-effect btn-sm"> Delete Post</button>
   
                           
                            </>
                        )}


                     
</figcaption>
</figure>
        </div>

</div>

);
        };

render() {
    if (this.state.redirectToHome){
        return <Redirect to={`/`}/>
    }
    const { post } = this.state;
    return (
        <div className="container">
            <h2 className="display-2 mt-5 mb-5">{post.title}</h2>

            {!post ? (
                <div className="jumbotron text-center">
                </div>
            ) : (
                this.renderPost(post)
            )}
        </div>
    );
}
};

export default SinglePost;