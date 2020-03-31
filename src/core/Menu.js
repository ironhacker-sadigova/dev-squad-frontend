import React from 'react';
import {Link, withRouter} from 'react-router-dom'; // withRouter takes another component as an argument
import {signout, authenticate} from '../auth';


// to show links in a different color if visited
const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#008B8B" };
    else return { color: "#ffffff" };
};

//A method : if the token is there , we have the token & we can use this info to show & hide the links
// if not just return false

export const isAuthenticated = (jwt, next) => { // if the token is there we have everything in the json webtoken
    if (typeof window !== "undefined") { 
        // as long as there is window object we can do something else false
        return false}

       if (localStorage.getItem("jwt")){
           return JSON.parse(localStorage.getItem("jwt")).JSON;
        }
           else {
               return false
           } 
   
    };

/*
//LOG THE USER OUT

export const signout = next => { // we are going to execute & do a callback to redirect to another page
    if (typeof window !== "undefined") localStorage.removeItem("jwt"); // make sure we have the window object
    next(); // then we can access the local storage and remove the key jwt from local Storage in the client side
    return fetch("http://localhost:8000/signout", {
        method: "GET"
    })
        .then(response => { 
            console.log("signout", response);
            return response.json();
        })
        .catch(err => console.log(err)); // catch if any error 
};

*/






// We can create a functional component, we don't need a class its gonna be without state

const Menu = ({history}) => (

    <div>
        <div className="menu">
                        <a href="">        <Link style={isActive(history,"/")} to = "/"> Home  </Link>  </a>                            
                        <a href="">        <Link style={isActive(history,'/signup')} to = "/signup"> Join  </Link> </a>
                        <a href="">        <Link style={isActive(history,"/signin")} to = "/signin"> Members </Link>   </a>
                        <a href="" style={(isActive(history,"/signout"))} onClick={()=> signout(()=> history.push("/"))}>   Exit   </a>
                        <a href="">         {isAuthenticated().user} </a>

        
        <div className="marca"></div>

       
</div>

</div>)



export default withRouter (Menu); 


