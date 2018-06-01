import React, { Component } from 'react';
import Axios from 'axios';
import AddGood from './AddGood';

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
        this.getGoods();
    }

    getGoods = () =>{
        Axios.get('http://localhost:3012/goods')
            .then(res =>{
                this.setState({goods: res.data});
            });
    }
  
    handleFilters = (e) => {
        e.target.type === 'checkbox' ?
            this.setState({[e.target.name]: e.target.checked}) : this.setState({[e.target.name]: e.target.value});
    }

    sortOrder = (a, b) => {
        return this.state.sort === 'price' ?
            +a.price.slice(1) > +b.price.slice(1) : a[this.state.sort] > b[this.state.sort];
    
    }

    handleClick = () => {
        this.setState({search: ''});
    }

    render() {
        let filteredGoods = this.state.goods.filter((good) =>
            this.state.isStocked ?
                good.name.toLowerCase().includes(this.state.search.toLowerCase()) && good.stocked === false :
                good.name.toLowerCase().includes(this.state.search.toLowerCase())
        );

        filteredGoods = filteredGoods.sort(this.sortOrder).map((good, index) =>
            good.stocked ?
                <li key={index}> {good.name} -- {good.price} </li>
                :<li key={index} 
                    style={{color: 'red'}}>
                    {good.name} -- {good.price} </li>
        );

        return(
            <div>
                search
                <input
                    value={this.state.search}
                    name = "search"
                    onChange={this.handleFilters}
                    type="text" />
                <button
                    onClick = {this.handleClick} > reset </button>
                stoked:
                <input
                    type="checkbox"
                    name = "isStocked"
                    checked={this.state.isStocked}
                    onChange={this.handleFilters} />
                <p>sort by </p>
                <select 
                    name = "sort"
                    onChange={this.handleFilters}
                    value={this.state.sort}>
                    <option value="name">name</option>
                    <option value="price">price</option>
                </select>

                <ul>
                    {filteredGoods}
                </ul>
                
                <AddGood update={this.getGoods} />
            </div>
        );
    }
}

export default GoodsList;
