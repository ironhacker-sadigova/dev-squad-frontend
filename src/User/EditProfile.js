import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { read } from "./apiUser";

// doing it individually to allow user to do changes 
class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            name: "",
            email: "",
            password: ""
        };
    }

    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToSignin: true });
            } else {
                this.setState({
                    id: data._id,
                    name: data.name,
                    email: data.email
                });
            }
        });
    };

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    clickSubmit = event => {
        event.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password
        };
        console.log(user);
       
    };

    signupForm = (name, email, password) => (
        <form>
                <div className="form-group">
                  <label className="name">Name</label>
                  <input className="form-control" onChange={this.handleChange("name")} type="name" name={name} id="name"  required value={name} />
                </div>
                <div className="form-group">
                  <label className="email">Email</label>
                  <input className="form-control" onChange={this.handleChange("email")} type="email" name={email} id="email" required value={email} />
                </div>
                <div className="form-group">
                  <label className="password">Password</label>
                  <input className="form-control" onChange={this.handleChange("password")} 
                  type="password" name="password" id="password" placeholder= "New password" required value={password} />
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
        const { name, email, password } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>

                {this.signupForm(name, email, password)}
            </div>
        );
    }
}

export default EditProfile;