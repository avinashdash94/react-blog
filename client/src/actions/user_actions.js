import axios from 'axios';
// import { response } from 'express';

import{ LOGIN_USER} from './types';

//When we submit the login data it comes to this action
export function loginUser(dataToSubmit){
    const request = axios.post('/api/users/login', dataToSubmit)
                    .then(response => response.data);
    
    return{
        type: LOGIN_USER,
        payload: request
    }
}
