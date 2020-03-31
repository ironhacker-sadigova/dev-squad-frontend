


export const signup = user => {
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


export const signin = user => {
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


export const  authenticate = (jwt, next) =>{
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(jwt));// access localStorage & grab the token
        next();
    }
};


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





