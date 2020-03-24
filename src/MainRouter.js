import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Heart/Home';
import Signup from './User/Signup';
import Signin from './User/Signin';


const MainRouter = () => (
    <div>
        <Switch>
            <Route exact path='/' component= {Home} /> 
            <Route exact path= '/signup' component = {Signup}/>
            <Route exact path= '/signin' component = {Signin}/>
        </Switch>
    </div>
)


export default MainRouter;