import axios from 'axios';

// const token = sessionStorage.getItem('token');

export const getGoods = () => axios.get('http://localhost:3012/goods');

export const deleteGoods = name => axios.delete('http://localhost:3012/goods', { data: { name } });

export const addGood = good => axios.post('http://localhost:3012/goods', good);
