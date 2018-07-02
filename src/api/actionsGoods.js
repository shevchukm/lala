import axios from 'axios';

const token = () => sessionStorage.getItem('token');

const apiUrl = 'http://localhost:3012/goods';

export const getGoods = () => axios.get(apiUrl);

export const deleteGoods = id => axios.delete(apiUrl, {
    data: { id },
    headers: { token: token() }
});

export const addGood = good => axios.post(apiUrl, good);

export const getCart = () => {
    let item = JSON.parse(localStorage.getItem('cart'));

    if (item) {
        return item;
    }
    localStorage.setItem('cart', JSON.stringify([]));
    item = JSON.parse(localStorage.getItem('cart'));

    return (item);
};

export const countGoods = goods => goods.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0);
