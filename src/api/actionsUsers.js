import axios from 'axios';

const ApiUrl = `${process.env.REACT_APP_API_URL}users`

export const token = () => sessionStorage.getItem('token');

export const create = user => axios.post(ApiUrl, user);

export const login = user => axios.post(`${ApiUrl}/login`, user);

export const deleteOne = id => axios.delete(ApiUrl, {
    headers: { token: token() },
    data: { id }
});

export const addUserGoods = (goods) => axios.post(`${ApiUrl}/goods`, { goods }, { headers: { token: token() } });

export const getUserGoods = () => axios.get(`${ApiUrl}/goods`, { headers: { token: token() } })

export const getAll = () => axios.get(ApiUrl);
