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

    render() {
        return (
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
                  <input className="form-control" type="text" name="username" id="username" placeholder="iron.hacker" required />
                </div>
                <div className="form-group">
                  <label for="email">Email</label>
                  <input className="form-control" type="text" name="email" id="email" placeholder="dev.squad@gmail.com" required />
                </div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input className="form-control" type="password" name="password" id="password" placeholder="********" required />
                </div>
                <div className="form-group">
                  <label for="passwordRepeat">Repeat Password</label>
                  <input className="form-control" type="password" name="passwordRepeat" id="passwordRepeat" placeholder="********" required />
                </div>
                <div className="m-t-lg">
                  <ul className="list-inline">
                    <li>
                      <input className="btn btn--form" type="submit" value="Register" />
                    </li>
                    <li>
                      <a className="signup__link" href="#">I am already a member</a>
                    </li>
                  </ul>
                </div>
              </form>  
            </div>
          </div>
    );
        
    
    }
}

export default Signup;