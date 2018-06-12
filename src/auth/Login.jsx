import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Input, Container, Header, Button, Message } from 'semantic-ui-react';
import { login } from '../actions/actionsUsers';

const initState = { 
    user: {
        email: '',
        password: ''
    },
    error: ''
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({user: {
            ...this.state.user,
            [name]: value
            }
        });
    };

    handleReset = () => {
        this.setState(initState);
    };

    handleLogin = () => {

        login(this.state)
            .then(res => {
                this.setState(initState);
                sessionStorage.setItem('token', res.data.token);
                this.props.history.push("/");
            })
            .catch( err => this.setState({ error: err.response.data }));
    };

    render() {
        return (
            <Container>
                <Header>Login</Header>
                <Input
                    iconPosition='left'
                    placeholder='Email'>
                    <Icon name='at' />
                    <input
                        name="email"
                        value={this.state.user.email}
                        onChange = {this.handleChange} />
                </Input>
                <br />
                <br />
                <Input
                    iconPosition='left'
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
                <Button.Group>
                    <Button onClick={this.handleReset}>Cancel</Button>
                    <Button.Or />
                    <Button
                        onClick={this.handleLogin}
                        positive>
                        Login
                    </Button>
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

export default connect(
    null,
    dispatch => ({
        setUser: user => dispatch({type: 'SET_USER', payload: user})
    })
)(Login);
