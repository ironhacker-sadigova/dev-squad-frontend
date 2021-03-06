import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { read, update, updateUser } from "./apiUser";
import { Redirect } from "react-router-dom";
import Avatar from "../images/avatar.png";

// doing it individually to allow user to do changes 
class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            redirectToProfile: false,
            fileSize: 0,
            about: ""
            
        };
    }

    init = userId => {
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

    componentDidMount() {
        this.userData = new FormData();
        const userId = this.props.match.params.userId
        this.init(userId);
        
    }

    isValid = () => {
        const { name, email, password, fileSize} = this.state;
        if (fileSize > 1000000) {
            this.setState({ error: "File size should be less than 100kb" });
            return false;
        }

        
 // IF NOT GETTING A NAME 

        if (name.length === 0) {
            this.setState({ error: "Name is required" });
            return false;
        }
// FOR VALID EMAILS => 

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState({ error: "A valid Email is required" });
            return false;
        }

// IF CHANGE OF PASSWORD 
        if (password.length >= 1 && password.length <= 7) {
            this.setState({
                error: "Password must be at least 8 characters long"
            });
            return false;
        }
        return true;
    };

    handleChange = name => event => {
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;
            const fileSize = name === "photo" ? event.target.files[0].size : 0;
            this.userData.set(name, value);
            this.setState({ [name]: value, fileSize });
        };

    clickSubmit = event => {
        event.preventDefault();
        if (this.isValid()) {
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;

            update(userId, token, this.userData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else
                updateUser(data, () => {
                    this.setState({
                        redirectToProfile: true
                    });
                });
        });
    }
};

    signupForm = (name, email, password,about) => (
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
                  <label className="name">Name</label>
                  <input className="form-control" onChange={this.handleChange("name")} type="name" name={name} id="name"  required value={name} />
                </div>
                <div className="form-group">
                  <label className="email">Email</label>
                  <input className="form-control" onChange={this.handleChange("email")} type="email" name={email} id="email" required value={email} />
                </div>

                <div className="form-group">
                  <label className="name">About</label>
                  <textarea className="form-control" onChange={this.handleChange("about")} type="text" value={about} id="about"  required value={about} />
                </div>

                
                <div className="form-group">
                  <label className="password">Password</label>
                  <input className="form-control" onChange={this.handleChange("password")} 
                  type="password" name="password" id="password" placeholder= "********" required value={password} />
                </div>
                <div className="form-group">
            </div>
                <div className="m-t-lg">
                  <ul className="list-inline">
                    <li>
                      <input className="btn btn--form" onClick={this.clickSubmit} type="submit" value="Update" />
                    </li>
                  </ul>
                </div>
              </form> 
       
       
       
    );

    render() {
        const { id, name, email, password, redirectToProfile, error} = this.state;

        if (redirectToProfile) {
            return <Redirect to={`/user/${id}`} />;
        }
        /*
this is going to embed the var process dotenv API 
        */
        const photoUrl = id
        ? `${process.env.REACT_APP_API_URL|| ""}/user/photo/${id}?${new Date().getTime()}`

        : Avatar;


        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>
                <img
                    style={{ height: "200px", width: "auto" }}
                    className="img-thumbnail"
                    src={photoUrl}
                    onError={i => (i.target.src = `${Avatar}`)}
                    alt={name}
                />                {this.signupForm(name, email, password)}
            </div>
        );
    }
}

export default EditProfile;

