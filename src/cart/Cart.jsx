import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Label, Popup } from 'semantic-ui-react';
import { getCart, countGoods } from '../api/actionsGoods';
import { addUserGoods, getUserGoods } from '../api/actionsUsers';
import ItemsList from '../shared/ItemsList';


class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            goods: []
        };
    };

    componentDidMount(){
        this.handleLoadGoods();
        this.props.token && this.mergeGoods(getCart());
    };


    handleLoadGoods = () => {
        const goods = getCart();
        this.setState({ goods });
        this.props.setGoodsCount(countGoods(goods));
    };

    mergeGoods(goods) {
        getUserGoods()
            .then(res => {
                let userGoods = res.data;
                if (goods.length === 0){
                    localStorage.setItem('cart', JSON.stringify(userGoods));
                    this.setState({userGoods});
                    this.props.setGoodsCount(countGoods(userGoods));
                } else {
                    userGoods = userGoods.filter(element => {
                        return goods.every(item =>{
                            if (element._id !== item._id){
                                return true;
                            } else {
                                item.count += element.count;
                                return false
                            }
                        });
                });
                goods = goods.concat(userGoods);
                this.setState({goods});
                localStorage.setItem('cart', JSON.stringify(goods));
                this.props.setGoodsCount(countGoods(goods));
                }
            })
            .catch(err => console.log(err));
    };

    handleAddGoodsToProfile = () => {
        addUserGoods(this.state.goods)
            .then()
            .catch(err=> console.log(err));
    };

    handleDelete = id => {
        const goods = this.state.goods.filter( item => id !== item._id);

        this.props.setGoodsCount(countGoods(goods));
        localStorage.setItem('cart', JSON.stringify(goods));
        this.setState({ goods });
    };
    render(){
        return(
            <Popup
                basic
                onMount={this.handleLoadGoods}
                on='click'
                hideOnScroll 
                trigger={<Button 
                            as='div'
                            labelPosition='right'>
                            <Button>
                                <Icon
                                name="shopping cart"
                                color="green" />
                            </Button>
                                <Label  floating color='red' size="large" >
                                    {this.props.getGoodsCount}
                                </Label>
                        </Button>}>

                <Popup.Header> Goods in localStorage </Popup.Header>
                <Popup.Content>
                    <ItemsList 
                        headers={['Id', 'Category', 'Price','Stock','Name', 'Count', 'Delete']}
                        items={this.state.goods}
                        onHandleDelete={this.handleDelete}/>
                    <Button color='blue' onClick={this.handleAddGoodsToProfile}> add to profile</Button>
                </Popup.Content>
            </Popup>
        );
    }
};

export default connect(   
    state => ({
        getGoodsCount: state.goodsCount
    }),
    dispatch =>({
        setGoodsCount: count => dispatch({type:"SET_COUNT_GOODS", payload: count})
    })
)(Cart);
