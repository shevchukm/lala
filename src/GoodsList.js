import React, { Component } from 'react';

const Goods = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "N"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];



class GoodsList extends Component{
  constructor(props){
    super(props)
    this.state = {
      goods: Goods,
      search: '',
      isStocked: false,
      sort: 'name'
    }
  }

  handleFilters = (e) => {
    e.target.type === 'checkbox' ?
      this.setState({[e.target.name]: e.target.checked}) : this.setState({[e.target.name]: e.target.value})
  }

  sortOrder = (a, b) => {
    return this.state.sort === 'price' ?
     +a.price.slice(1) > +b.price.slice(1) : a[this.state.sort] > b[this.state.sort]
   
  }

  render(){
    let filteredGoods = this.state.goods.filter((good) =>
      this.state.isStocked ?
        good.name.toLowerCase().includes(this.state.search.toLowerCase()) && good.stocked === false :
        good.name.toLowerCase().includes(this.state.search.toLowerCase())
    );
    filteredGoods = filteredGoods.sort(this.sortOrder).map((good, index) =>
      good.stocked ?
        <li key={index}> {good.name} -- {good.price} </li>
        :<li key={index} style={{color: 'red'}}> {good.name} -- {good.price} </li>
    )
    return(
      <div>
        search
        <input value={this.state.search} name = 'search' onChange={this.handleFilters} type='text'/>
        <button onClick = {() => this.setState({search: 'misha'})} > reset </button>
        <input type='checkbox' name = 'isStocked' checked={this.state.isStocked} onChange={this.handleFilters}/> stoked
        <p>sort by </p>
        <select name = 'sort' onChange={this.handleFilters} value={this.state.sort}>
          <option value="name">name</option>
          <option value="price">price</option>
        </select>

        <ul>
         {filteredGoods}
        </ul> 
      </div>
    )
  }
}

export default GoodsList;
