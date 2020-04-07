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