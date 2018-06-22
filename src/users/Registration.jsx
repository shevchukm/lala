import React, { Component } from 'react';
import { Icon, Input, Container, Header, Message, Divider } from 'semantic-ui-react';
import { create } from '../api/actionsUsers';
import SubmitButtons from '../shared/SubmitButtons';

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

    handleChange = (event, data) => {
        const { name, value } = data;

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
            .then(res => {
                this.handleReset();
                this.setState({error: res.data})
            })
            .catch(err => this.setState({error: err.data || 'problems with conection'}));
    };

    render() {
        return (
            <Container>
                <Header>REGISTRATION</Header>
                <Input
                    iconPosition="left"
                    placeholder="Email"
                    name="email"
                    value={this.state.user.email}
                    onChange = {this.handleChange} >
                    <Icon name="at" />
                    <input />
                </Input>
                <Divider hidden />
                <Input iconPosition='left'
                    placeholder='name'
                    name="name"
                    value={this.state.user.name}
                    onChange = {this.handleChange} >
                    <Icon name='user' />
                    <input />
                </Input>
                <Divider hidden />
                <Input iconPosition='left'
                    placeholder='password'
                    type="password"
                    name="password"
                    value={this.state.user.password}
                    onChange = {this.handleChange}>
                    <Icon name='lock' />
                    <input />
                </Input>
                <Divider hidden />
                <Input iconPosition='left'
                    placeholder='confirm password'
                    type="password"
                    name="password2"
                    value={this.state.password2}
                    onChange = {this.handleChange}>
                    <Icon name='lock' />
                    <input />
                </Input>
                <Divider hidden />
                <SubmitButtons
                    onHandleSubmit={this.handleReg}
                    onHandleReset={this.handleReset}
                    submitName = 'Registrate' />
                <Divider hidden />
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
