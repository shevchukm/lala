import React, { Component } from 'react';
import { getGoods, deleteGoods } from '../actions/actionsGoods';
import FilterBar from './FiltersBar';
import { Table, Message, Button, Container, Icon } from 'semantic-ui-react';

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
        getGoods().then(res => this.setState({goods: res.data, error: ''}))
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

    handleDelete = (name) => {
        deleteGoods(name).then(() => { this.getGoods(); })
        .catch(err => this.setState({ error: err.response.data }));
    };

    render() {
        let filteredGoods = this.state.goods.filter((good) =>
            this.state.isStocked ?
                good.name.toLowerCase().includes(this.state.search.toLowerCase()) && good.stocked === false :
                good.name.toLowerCase().includes(this.state.search.toLowerCase())
        );

        filteredGoods = filteredGoods.sort(this.sortOrder).map((good, index) =>
                <Table.Row key={index}>
                    <Table.Cell>
                        {good.name}  
                    </Table.Cell >
                    <Table.Cell>
                        {good.price}
                    </Table.Cell>
                    <Table.Cell>
                        {good.category}
                    </Table.Cell>
                    <Table.Cell>
                        <Button type="button"
                                onClick={() => this.handleDelete(good.name)}
                                icon
                                color="red">
                            <Icon name='delete' />
                        </Button>
                    </Table.Cell>
                </Table.Row >

        );

        return(
            <Container>
                <FilterBar
                    state={this.state}
                    onHandleFilters={this.handleFilters}
                    sortOrder={this.sortOrder}
                    handleReset={this.handleReset}
                />
                
                <Table basic='very' celled collapsing>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                        <Table.HeaderCell>Category</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {filteredGoods}
                    </Table.Body>
                </Table>
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

export default GoodsList;
