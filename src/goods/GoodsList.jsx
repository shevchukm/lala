import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message, Button, Container } from 'semantic-ui-react';
import { getGoods, deleteGoods, getCart } from '../api/actionsGoods';
import FilterBar from './FiltersBar';
import ItemsList from '../shared/ItemsList';

class GoodsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goods: [],
            search: '',
            isStocked: false,
            sort: 'name',
            error: ''
        };

    };
  
    componentDidMount() {
        this.getGoods();
    };

    getGoods = () => {
        getGoods().then(res => {
            this.setState({ goods: res.data, error: '' });
        })
        .catch(err => this.setState({ error: err }));
    };
  
    handleFilters = (event, data) => {

        const { name, value, type } = data;
        
        if (type === 'checkbox') {
            this.setState({ [name]: !this.state[name] });
        } else { this.setState({ [name]: value });}
    };

    sortOrder = (a, b) => {
        return this.state.sort === 'price' 
            ? +a.price.slice(1) > +b.price.slice(1) 
            : a[this.state.sort] > b[this.state.sort];
    
    };

    handleReset = () => {
        this.setState({search: ''});
    };

    handleDelete = id => {
        deleteGoods(id)
            .then(() => this.getGoods())
            .catch(err => this.setState({ error: err.response.data }));
    };


    handleAddToCart = good => {
        const cart = getCart();
        const item = cart.find(item => item._id === good._id);
        if (item) {
            item.count++
        } else {
            good.count = 1;
            cart.push(good);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        this.props.setGoodsCount(this.props.getGoodsCount + 1);
    };

    render() {
        const { isStocked, search, goods } = this.state;

        const searchStoked = (name, search) => name.toLowerCase().includes(search);
        
        let filteredGoods = goods.filter(({name, stocked}) =>
            isStocked ?
                searchStoked(name, search) && stocked === true :
                searchStoked(name, search)
        );

        filteredGoods = filteredGoods.sort(this.sortOrder);

        return(
            <Container>
                <FilterBar
                    state={this.state}
                    onHandleFilters={this.handleFilters}
                    sortOrder={this.sortOrder}
                    handleReset={this.handleReset}
                />
                
                <ItemsList 
                    headers={['Id', 'Category', 'Price','Stock','Name','Delete']}
                    items={filteredGoods}
                    onHandleDelete={this.handleDelete}
                    onHandleAddToCart={this.handleAddToCart}
                />

                { this.state.error &&
                    <Message warning compact>
                        <Message.Header>Error has occured</Message.Header>
                        <p>{this.state.error.toString()}</p>
                        <Button onClick={this.getGoods}>try again</Button>
                    </Message>
                }
            </Container>
        );
    }
}

export default connect(   
    state => ({
        getGoodsCount: state.goodsCount
    }),
    dispatch =>({
        setGoodsCount: count => dispatch({type:"SET_COUNT_GOODS", payload: count})
    })
)(GoodsList);
