import axios from 'axios';
const ROOT_URL = 'http://localhost:3000/api';

export function login({ email, name }) {
    return axios.post(`${ROOT_URL}/login`, {
        email,
        name
    });
}

export function createAction( email, type, message, author ) {
    return axios.post(`${ROOT_URL}/createAction/${email}`, {
        type,
        message,
        author
    })
}

export function getActionsByType( email, type ) {
    return axios.get(`${ROOT_URL}/getActionsByType/${email}/${type}`)
}

export function getActions( email ) {
    return axios.get(`${ROOT_URL}/getActions/${email}`)
}

export function getUsers() {
    return axios.get(`${ROOT_URL}/getUsers/`)
}
