import React, { Component } from 'react';
import { Icon, Input, Container, Header, Button, Message } from 'semantic-ui-react';
import { create } from '../actions/actionsUsers';

const initState = { 
    user: {
        name: '',
        email: '',
        password: ''
    },
    password2: '',
    error: ''
};

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }

    handleChange = event => {
        const { name, value } = event.target;

        if (name === 'password2') {
            this.setState({ [name]: value });
        } else {
            this.setState({user: {
                ...this.state.user,
                [name]:value
            }});
        }
    };

    handleReset = () => {
        this.setState(initState);
    };

    handleReg = () => {
        create(this.state.user)
            .then( this.handleReset())
            .catch(this.setState({error: 'some problems with conection'}));
    };

    render() {
        return (
            <Container>
                <Header>REGISTRATION</Header>
                <Input
                    iconPosition="left"
                    placeholder="Email">
                    <Icon name="at" />
                    <input
                        name="email"
                        value={this.state.user.email}
                        onChange = {this.handleChange} />
                </Input>
                <br />
                <br />
                <Input iconPosition='left'
                    placeholder='name'>
                    <Icon name='user' />
                    <input
                        name="name"
                        value={this.state.user.name}
                        onChange = {this.handleChange} />
                </Input>
                <br />
                <br />
                <Input iconPosition='left'
                    placeholder='password'
                    type="password">
                    <Icon name='lock' />
                    <input
                        name="password"
                        value={this.state.user.password}
                        onChange = {this.handleChange} />
                </Input>
                <br />
                <br />
                <Input iconPosition='left'
                    placeholder='confirm password'
                    type="password">
                    <Icon name='lock' />
                    <input
                        name="password2"
                        value={this.state.password2}
                        onChange = {this.handleChange} />
                </Input>
                <br />
                <br />
                <Button.Group>
                    <Button onClick={this.handleReset}>Cancel</Button>
                    <Button.Or />
                    <Button onClick={this.handleReg}
                        positive>Registrate</Button>
                </Button.Group>
                <br />
                { this.state.error &&
                    <Message warning compact>
                        <Message.Header>Error had occured</Message.Header>
                        <p>{this.state.error}</p>
                    </Message>
                }
            </Container>
        );
    }
}

export default Registration;
