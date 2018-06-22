import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Label, Popup } from 'semantic-ui-react';
import { getCart } from '../api/actionsGoods';
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
    };

    handleLoadGoods = () => {
        const goods = getCart();

        this.setState({ goods });
        this.props.setGoodsCount(this.countGoods(goods));      
    };

    // mergeGoods(goods) {
    //     getUserGoods()
    //         .then(res => {
    //             let userGoods = res.data;

    //             mergedGoods = mergedGoods.filter((item, index, arr) => {
    //                 const duplicateIndex = arr.indexOf(item, index +1);

    //                 if (index === duplicateIndex) {
    //                     item.count += arr[duplicateIndex];
    //                     return false;
    //                 } else return true
    //             })
    //             this.setState({goods: mergedGoods});
    //         })
    //         .catch(err => console.log(err));
    // };

    handleAddGoodsToProfile = () => {
        addUserGoods(this.state.goods)
            .then()
            .catch(err=> console.log(err));
    };

    countGoods(goods) {
        return goods.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0);
    };

    handleDelete = id => {
        const goods = this.state.goods.filter( item => id !== item._id);

        this.props.setGoodsCount(this.countGoods(goods));
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
