// WILL BE SIMILAR TO THE EDIT PROFILE COMPONENT
// IMAGE UPLOAD FUNCTIONALITY , FORM , IMAGE , NAME , EMAIL , ETC 


import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./apiPost";
import { Redirect } from "react-router-dom";
import Avatar from "../images/avatar.png";

// doing it individually to allow user to do changes 
class NewPost extends Component {
    constructor() {
        super();
        this.state = {
            title:"",
            body:"",
            photo:"",
            error:"",
            fileSize: 0, // BY DEFAULT 0 
            user:{}  // EMPTY OBJECT FOR YET 
            
        };
    }

   /* init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToProfile: true });
            } else {
                this.setState({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    error:"",
                    about: data.about
                });
            }
        });
    };
*/
    componentDidMount() {
        this.postData = new FormData(); // we keep NEW FORM DATA Because there will be upload image
        // no need for userId 
        // just when the component mounts : 
        this.setState({user:isAuthenticated().user}) // just to grab Id etc
    }

    isValid = () => {
        const {title, body, fileSize} = this.state;
        if (fileSize > 1000000) {
            this.setState({ error: "File size should be less than 100kb" });
            return false;
        }

        
// VALIDATION FOR THE TITLE & BODY
// ENSURING THAT ITS NOT EMPTY

        if (title.length === 0 || body.length===0) {
            this.setState({ error: "Please fill the field" });
            return false;
        }
// IF ENCOUNTER ERROR 
        return true;
    };

    // WORKING EXACTLY THE SAME AS FOR USER EDIT PROFILE
    // WE GRAB THE VALUE IF THE NAME IS PHOTO WE GRAB THE EVENT TAGET FILES OTHERWISE THE VALUE
    // WE GRAB THE SIZE 
    handleChange = name => event => {
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;
            const fileSize = name === "photo" ? event.target.files[0].size : 0;
            this.postData.set(name, value);
            this.setState({ [name]: value, fileSize });
        };


    clickSubmit = event => {
        event.preventDefault();
        if (this.isValid()) {
            const userId = isAuthenticated().user._id; // we Grab the id from the local storage from isAuthenticated 
            const token = isAuthenticated().token;

            create(userId, token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else{
                    this.setState({
                        title:"",
                        body:"",
                        redirectToProfile:true
                    });
                console.log("New post: ", data);
                    }
                });

            }
        };
        
    

    newPostForm = (title,body) => (
        <form>
         <div className="form-group">
                <label className="name">Profile Photo</label>
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
                      <input className="btn btn--form" onClick={this.clickSubmit} type="submit" value="Publish" />
                    </li>
                  </ul>
                </div>
              </form> 
       
       
       
    );

    render() {
        const { title, body, photo, user, error} = this.state;

      /*  if (redirectToProfile) {
            return <Redirect to={`/user/${id}`} />;
        }

        const photoUrl = id
        ? `${process.env.REACT_APP_API_URL|| ""}/user/photo/${id}?${new Date().getTime()}`

        : Avatar;
*/

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Create a new Post</h2>
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>
             
                
                
                         {this.newPostForm(title,body)}
            </div>
        );
    }
}

export default NewPost;
/*
<img
style={{ height: "200px", width: "auto" }}
className="img-thumbnail"
src={photoUrl}
onError={i => (i.target.src = `${Avatar}`)}
alt={name}
/>  */