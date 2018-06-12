import axios from 'axios';

export const create = user => axios.post('http://localhost:3012/users', user);

export const login = user => axios.post('http://localhost:3012/users/login', user);

export const deleteOne = id => axios.delete('http://localhost:3012/users', {
    headers: { token: sessionStorage.getItem('token') },
    data: { id }
});

export const getAll = () => axios.get('http://localhost:3012/users');
