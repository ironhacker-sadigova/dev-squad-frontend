export const read = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL|| ""}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`  
            /* A Bearer Token is an opaque string,
             not intended to have any meaning to clients using it.
              Some servers will issue tokens that are a short
             string of hexadecimal characters, 
             while others may use structured tokens such as JSON Web Tokens. */
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL|| ""}/users`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const update = (userId, token, user) => {
    return fetch(`${process.env.REACT_APP_API_URL|| ""}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL|| ""}/user/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


// SAVING UPDATES IN THE LOCALSTORAGE 


export const updateUser = (user, next) => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("jwt")) {
            let auth = JSON.parse(localStorage.getItem("jwt"));
            auth.user = user;
            localStorage.setItem("jwt", JSON.stringify(auth));
            next();
        }
    }
};

export const follow = (userId, token, followId) => {
    return fetch(`${process.env.REACT_APP_API_URL|| ""}/user/follow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, followId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const unfollow = (userId, token, unfollowId) => {
    return fetch(`${process.env.REACT_APP_API_URL|| ""}/user/unfollow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, unfollowId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};