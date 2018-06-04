import React, { Component } from 'react';
import {getGoods, deleteGoods } from '../actions/actionsGoods';
import AddGood from './AddGood';
import ActionBar from './ActionBar';

class GoodsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goods: [],
            search: '',
            isStocked: false,
            sort: 'name'
        };

    }
  
    componentDidMount() {
        getGoods().then(res => this.setState({goods: res.data}));
    }
  
    handleFilters = (e) => {
        e.target.type === 'checkbox' ?
            this.setState({[e.target.name]: e.target.checked}) : this.setState({[e.target.name]: e.target.value});
    }

    sortOrder = (a, b) => {
        return this.state.sort === 'price' ?
            +a.price.slice(1) > +b.price.slice(1) : a[this.state.sort] > b[this.state.sort];
    
    }

    handleReset = () => {
        this.setState({search: ''});
    }

    handleDelete = (name) => {
        deleteGoods(name).then(() => {
            getGoods().then(res => this.setState({goods: res.data}));
        });
    }

    render() {
        let filteredGoods = this.state.goods.filter((good) =>
            this.state.isStocked ?
                good.name.toLowerCase().includes(this.state.search.toLowerCase()) && good.stocked === false :
                good.name.toLowerCase().includes(this.state.search.toLowerCase())
        );

        filteredGoods = filteredGoods.sort(this.sortOrder).map((good, index) =>
            good.stocked ?
                <li key={index}> {good.name} -- {good.price} 
                    <button type="button"
                     onClick={() => this.handleDelete(good.name)}> delete</button> </li>
                :<li key={index} 
                    style={{color: 'red'}}>
                    {good.name} -- {good.price}
                    <button type="button"
                     onClick={() => this.handleDelete(good.name)}> delete</button>  
                </li>
        );

        return(
            <div>
                <ActionBar
                    state={this.state}
                    handleFilters={this.handleFilters}
                    sortOrder={this.sortOrder}
                    handleReset={this.handleReset}
                />
                
                <ul>{filteredGoods}</ul>
                <AddGood update={this.getGoods} />
            </div>
        );
    }
}

export default GoodsList;
