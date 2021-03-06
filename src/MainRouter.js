/*
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signup from "./User/Signup";
import Signin from "./User/Signin";
import Profile from "./User/Profile";
import Users from "./User/Users";
import EditProfile from "./User/EditProfile";
const MainRouter = () => (
    <div>
    <Menu/>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={Users}/>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/user/edit/:userId" component={EditProfile} />
            <Route exact path="/user/:userId" component={Profile} /> 
            
         
        </Switch>
    </div>
);
export default MainRouter;*/


import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signup from "./User/Signup";
import Signin from "./User/Signin";
import Profile from "./User/Profile";
import Users from "./User/Users";
import FindPeople from "./User/FindPeople";
import EditProfile from "./User/EditProfile";
import PrivateRoute from "./auth/PrivateRoute";
import NewPost from "./Post/NewPost";
import SinglePost from "./Post/SinglePost";
import EditPost from "./Post/EditPost";

const MainRouter = () => (
    
        <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />           
            <PrivateRoute exact path="/findpeople" component={FindPeople} />
            <PrivateRoute exact path="/user/:userId" component={Profile} />
            <PrivateRoute exact path="/post/create" component={NewPost} />
            <PrivateRoute exact path="/post/:postId" component={SinglePost} />
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />



            

        </Switch>
    </div>
);

export default MainRouter;