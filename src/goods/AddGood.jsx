import React, { Component } from 'react';
import {Input, Button, Checkbox, Icon, Container, Header, Message } from 'semantic-ui-react'
import { addGood } from '../actions/actionsGoods';

const initState = {
    category: '',
    price: '',
    stocked: false,
    name: ''
};

class AddGood extends Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }

    handleChange = (event, data) => {
        const { name, value, type } = data;

        if (type === 'checkbox') {
            this.setState({ [name]: !this.state[name] });
        } else { this.setState({ [name]: value });}
    }

    handleCreate = () => {
        addGood(this.state)
            .then(() =>  this.setState(initState))
            .catch(err => this.setState({error: err}));
    }
    render() {
        return (
            <Container>
                <Header>ADD GOOD</Header>
                <Input
                    iconPosition="left"
                    onChange={this.handleChange}
                    placeholder="Category"
                    value={this.state.category} 
                    name="category">
                    <Icon name="tag" />
                    <input />
                </Input>
                <br />
                <br />
                <Input
                    iconPosition='left'
                    placeholder='price'
                    value={this.state.price}
                    name="price"
                    onChange={this.handleChange} >
                    <Icon name='money bill alternate outline' />
                    <input />
                </Input>
                <br />
                <br />
                <Input
                    iconPosition='left'
                    placeholder='name'
                    value={this.state.name}
                    name="name"
                    onChange={this.handleChange} >
                    <Icon name='address card outline' />
                        <input />
                </Input>
                <br />
                <br />
                <Checkbox
                    toggle
                    checked={this.state.stocked}
                    name="stocked"
                    onChange={this.handleChange}
                    label="Stocked"
                />
                <br />
                <br />
                { this.state.error ?
                    <Message warning compact>
                        <Message.Header>Error has occured on loading goods</Message.Header>
                        <p>{this.state.error.toString()}</p>
                        <Button onClick={this.handleCreate}>try again</Button>
                    </Message>
                    :
                    <Button.Group>
                        <Button onClick={this.handleReset}>Cancel</Button>
                        <Button.Or />
                        <Button onClick={this.handleCreate}
                            positive>Add good</Button>
                    </Button.Group>
                }
            </Container>
        );
    }
}

export default AddGood;
