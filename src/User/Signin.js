


import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false
        };
    }
// This will take the name as parameter , and the arrow function will return another function
    // as the input changes, they will be available on the event target
    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
         // based on the input we populate the field
    };

    authenticate(jwt, next) {
        if (typeof window !== "undefined") {
            localStorage.setItem("jwt", JSON.stringify(jwt));// access localStorage & grab the token
            next();
        }
    }

    clickSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;
        const user = {
            email,
            password
        };
        console.log(user);
        this.signin(user).then(data => {
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                // authenticate
                this.authenticate(data, () => {
                    this.setState({ redirectToReferer: true });
                });
            }
        });
    };

    signin = user => {
        return fetch("http://localhost:8000/signin", {
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

    signinForm = (email, password) => (
        <form>
            

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
                      <input className="btn btn--form" onClick={this.clickSubmit} type="submit" value="Log in" />
                    </li>
                    
                  </ul>
                </div>
              </form> 
    );

    render() {
        const { email, password, error, redirectToReferer } = this.state;

        if (redirectToReferer) {
            return <Redirect to="/" />; // component provided by React Dom 
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">SignIn</h2>

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {this.signinForm(email, password)}
            </div>
        );
    }
}

export default Signin;