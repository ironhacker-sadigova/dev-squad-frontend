
import React, { Component } from "react";
import {signup} from '../auth';
import {Link} from "react-router-dom";


class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
        };
    }
    // This will take the name as parameter , and the arrow function will return another function
    // as the input changes, they will be available on the event target

    handleChange = name => event => {
        this.setState({ error: "" });
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
        // console.log(user);
        signup(user).then(data => {
            if (data.error) this.setState({ error: data.error });
            else
                this.setState({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    open: true
                });
        });
    };

    /* signup = user => {
        return fetch("http://localhost:8000/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err));
    };

    */

    signupForm = (name, email, password) => (
       /* <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Submit
            </button>
        </form>

*/ 
<form>
            <div className="signup__container">
            <div className="container__child signup__thumbnail">
              <div className="thumbnail__logo">
              </div>
              <div className="thumbnail__content text-center">
                <h2 className="heading--secondary">Are you ready to join the elite?</h2>
              </div>
             
              <div className="signup__overlay"></div>
            </div>
            <div className="container__child signup__form">
              <form action="#">
                <div className="form-group">

                  <label className="username">Username</label>
                  <input 
                  className="form-control"
                   onChange = {this.handleChange("name")} type="text" name="username" id="username" placeholder="iron.hacker"  r value={name} required />
                </div>

                <div className="form-group">
                  <label className="email">Email</label>
                  <input className="form-control" onChange={this.handleChange("email")} type="email" name="email" id="email" placeholder="dev.squad@gmail.com" required value={email} />
                </div>

                <div className="form-group">
                  <label classname="password">Password</label>
                  <input className="form-control" onChange={this.handleChange("password")} 
                  type="password" name="password" id="password" placeholder="********" required value={this.state.password} />
                </div>

                <div className="form-group">
              

                
            </div>
      
                <div className="m-t-lg">
                  <ul className="list-inline">
                    <li>
                      <input className="btn btn--form" onClick={this.clickSubmit} type="submit" value="Register" />
                    </li>
                    
                  </ul>
                </div>
              </form>  
            </div>
          </div>
    </form> 

);


    render() {
        const { name, email, password, error, open } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>
                <div
                    className="alert alert-info"
                    style={{ display: open ? "" : "none" }}
                >
                    Welcome to dev Squad. Please{" "}
                    <Link to="/signin">Sign In</Link>.
                </div>

                {this.signupForm(name, email, password)}
            </div>
        );
    }
}

export default Signup;