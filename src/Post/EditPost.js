import React, { Component } from "react";
import { singlePost, editUserPost } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import PostBackground from "../images/postbackgroundbydefault.jpeg";


class EditPost extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            title: "",
            body: "",
            redirectToProfile: false,
            error: "",
            fileSize: 0,
        };
    }

    init = postId => {
 singlePost(postId).then(data => {
if (data.error) {
        this.setState({ redirectToProfile: true });
            } else {
    this.setState({
         id: data._id,
         title: data.title,
         body: data.body,
             error: ""
                });
            }
        });
    };

componentDidMount() {
    this.postData = new FormData();
    const postId = this.props.match.params.postId;
    this.init(postId);
    }

    isValid = () => {
        const { title, body, fileSize } = this.state;
 if (fileSize > 100000) {
            this.setState({
                error: "File size should be less than 100kb",
            });
            return false;
        }
if (title.length === 0 || body.length === 0) {
            this.setState({ error: "Please fill all fields" });
            return false;
        }
        return true;
    };

    handleChange = name => event => {
    this.setState({ error: "" });
    const value =
 name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.postData.set(name, value);
this.setState({ [name]: value, fileSize });
    };

clickSubmit = event => {
    event.preventDefault();

 if (this.isValid()) {
     const postId = this.state.id;
    const token = isAuthenticated().token;

     editUserPost(postId, token, this.postData).then(data => {
                 if (data.error) this.setState({ error: data.error });
             else {
                    this.setState({
                        loading: false,
                        title: "",
                        body: "",
                        redirectToProfile: true
                    });
                }
            });
        }
    };

editPostForm = (title,body)=>(

    <form>
    <div className="form-group">
           <label className="name">Post Photo</label>
           <input
               onChange={this.handleChange("photo")}
               type="file"
               accept="image/*"
               className="form-control"
           />
       </div>
           <div className="form-group">
             <label className="name">Title</label>
             <input className="form-control" onChange={this.handleChange("title")} type="name" name={title} id="name"  required value={title} />
           </div>
          
           <div className="form-group">
             <label className="name">Body</label>
             <textarea className="form-control" onChange={this.handleChange("body")} type="text" value={body} id="body"  required value={body} />
           </div>

           
           <div className="form-group">
       </div>
           <div className="m-t-lg">
             <ul className="list-inline">
               <li>
                 <input className="btn btn--form" onClick={this.clickSubmit} type="submit" value="Edit Post" />
               </li>
             </ul>
           </div>
         </form> 
  
);

render() {
   const { id, title, body, redirectToProfile,error} = this.state;

  if (redirectToProfile) {
       return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
   }
/*
   const photoUrl = id
   ? `${process.env.REACT_APP_API_URL|| ""}/user/photo/${id}?${new Date().getTime()}`

   : Avatar;
*/

   return (
       <div className="container">
           <h2 className="mt-5 mb-5">{title}</h2>
           
           <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
    >
        {error}
    </div>
    <img
        style={{ height: "200px", width: "auto" }}
        className="img-thumbnail"
        src={`${
                        process.env.REACT_APP_API_URL|| ""
                    }/post/photo/${id}?${new Date().getTime()}`}
                    onError={i => (i.target.src = `${PostBackground}`)}
                    alt={title}
    />          
           
           
           
           
           {this.editPostForm(title,body)}
        
       </div>
   );
}
};



    export default EditPost;


         