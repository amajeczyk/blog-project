import jwt_decode from "jwt-decode";
let currentUser = localStorage.getItem('currentUser');

export const authenticationService = {
    authenticateRequest,
    logout,
    getTokenFromLocalStorage
}

async function authenticateRequest(){
    currentUser = localStorage.getItem('currentUser');
    if(!currentUser){
        return null;
    }
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authToken :  currentUser})
    };

    const response = await fetch("https://majerczyk-blog-it.herokuapp.com/users/authenticate", requestOptions).then(response => response.json());

    if(response.authentication){        
        return jwt_decode(currentUser); //returing jwt payload
    }
    return null;
}

function getTokenFromLocalStorage(){
    return localStorage.getItem('currentUser');
}

function logout() {
    // remove user from local storage to log user out
    currentUser = null;
    localStorage.removeItem('currentUser');
}