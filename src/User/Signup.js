
import React, { Component } from "react";


class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false,
            recaptcha: false
        };
    }

    // This will take the name as parameter , and the arrow function will return another function
    // as the input changes, they will be available on the event target

    handleChange = name => event => {
      
        this.setState({ error: "" }); 
        this.setState({ [name]: event.target.value });
        // based on the input we populate the field
    };

    recaptchaHandler = e => {
        this.setState({ error: "" });
        let userDay = e.target.value.toLowerCase();
        let dayCount;

        if (userDay === "sunday") {
            dayCount = 0;
        } else if (userDay === "monday") {
            dayCount = 1;
        } else if (userDay === "tuesday") {
            dayCount = 2;
        } else if (userDay === "wednesday") {
            dayCount = 3;
        } else if (userDay === "thursday") {
            dayCount = 4;
        } else if (userDay === "friday") {
            dayCount = 5;
        } else if (userDay === "saturday") {
            dayCount = 6;
        }

        if (dayCount === new Date().getDay()) {
            this.setState({ recaptcha: true });
            return true;
        } else {
            this.setState({
                recaptcha: false
            });
            return false;
        }
    };

    
    signupForm = (name, email, password, recaptcha) => (
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

                  <label for="username">Username</label>
                  <input 
                  className="form-control"
                   onChange = {this.handleChange("name")} type="text" name="username" id="username" placeholder="iron.hacker"  required value={name} />
                </div>

                <div className="form-group">
                  <label for="email">Email</label>
                  <input className="form-control" onChange={this.handleChange("email")} type="email" name="email" id="email" placeholder="dev.squad@gmail.com" required value={email} />
                </div>

                <div className="form-group">
                  <label for="password">Password</label>
                  <input className="form-control" onChange={this.handleChange("password")} 
                  type="password" name="password" id="password" placeholder="********" required value={this.state.password} />
                </div>

                <div className="form-group">
                  <label for="passwordRepeat">Repeat Password</label>
                  <input className="form-control"  onChange={this.handleChange("password")} type="password" name="passwordRepeat" id="passwordRepeat" placeholder="********" required />
                </div>

                <div className="form-group">
                <label className="text-muted">
                 {recaptcha ? "Thanks. You got it!" : "What day is today?"} 
                </label>

                <input
                    onChange={this.recaptchaHandler}
                    type="text"
                    className="form-control"
                />
            </div>
      
                <div className="m-t-lg">
                  <ul className="list-inline">
                    <li>
                      <input className="btn btn--form" type="submit" value="Register" />
                    </li>
                    
                  </ul>
                </div>
              </form>  
            </div>
          </div>
        </form>
    );

    render() {
        const { name, email, password, error, open, recaptcha } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>

                
                <hr />
                <br />

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
                    New account is successfully created. Please{" "}
                </div>

                {this.signupForm(name, email, password, recaptcha)}
            </div>
        );
    }
}

export default Signup;