import axios from 'axios';
// import { response } from 'express';

import{ LOGIN_USER, REGISTER_USER } from './types';

//When we submit the login data it comes to this action
export function loginUser(dataToSubmit){
    const request = axios.post('/api/users/login', dataToSubmit)
                    .then(response => response.data);
    
    return{
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUSer(dataToSubmit){
    const request = axios.post('/api/users/register', dataToSubmit)
                    .then(response => response.data);
    
    return{
        type: REGISTER_USER,
        payload: request
    }
}
