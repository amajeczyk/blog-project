import jwt_decode from "jwt-decode";
let currentUser = localStorage.getItem('currentUser');

export const authenticationService = {
    authenticateRequest,
    logout
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

    const response = await fetch("http://localhost:3001/users/authenticate", requestOptions).then(response => response.json());

    console.log('response.authentication', response.authentication);
    if(response.authentication){        
        return jwt_decode(currentUser); //returing jwt payload
    }
    return null;
}

function logout() {
    // remove user from local storage to log user out
    currentUser = null;
    localStorage.removeItem('currentUser');
}