import { baseUrl } from '../utils/local';
import request from '../services/request.js';

function UserLogIn(params) {    
    return request.post(`${baseUrl()}/userLogIn`,params)
        .then(response => {
            return response
        })
        .catch(error => error);
}

export { UserLogIn };  