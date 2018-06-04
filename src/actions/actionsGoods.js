import Axios from 'axios';

export const getGoods = () =>{
    return Axios.get('http://localhost:3012/goods');
};

export const deleteGoods = (name) =>{
    return Axios.delete('http://localhost:3012/goods', {data: {name: name}});
};
