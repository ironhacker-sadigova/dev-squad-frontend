// NEED TO CREATE A POST CREATE METHOD 
// SAME THAT WHAT I HAVE DONE FOR apiUsers
// TO CREATE A NEW POST I NEED USER ID TOKEN AND POST with title & body
// POST REQUEST 
export const create = (userId, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URL|| ""}/post/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// going to fetch all the posts and give the response 

export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL|| ""}/posts`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// BASED ON THE Id WE HAVE WE MAKE A GET REQUEST TO GET THE POST
// THIS METHOD WILL GET THE BACK END 
//IT WILL FETCH FROM BACKEND AND GIVE THE RESPONSE 

export const singlePost = postId => {
    return fetch(`${process.env.REACT_APP_API_URL|| ""}/post/${postId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


// TO SEE ALL THE POSTS OF A SPECIFIC USER 

export const showPostsByUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL|| ""}/posts/by/${userId}`, {
        method: "GET",
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