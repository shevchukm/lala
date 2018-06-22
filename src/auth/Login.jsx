import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Input, Container, Header, Message, Divider} from 'semantic-ui-react';
import { login } from '../api/actionsUsers';
import SubmitButtons from '../shared/SubmitButtons';

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

    handleChange = (event, data) => {
        const { name, value } = data;

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
                    placeholder='Email'
                    name="email"
                    value={this.state.user.email}
                    onChange = {this.handleChange} >
                    <Icon name='at' />
                    <input />
                </Input>
                <Divider hidden />
                <Input
                    iconPosition='left'
                    placeholder='password'
                    type="password"
                    name="password"
                    value={this.state.user.password}
                    onChange = {this.handleChange} >
                    <Icon name='lock' />
                    <input />
                </Input>
                <Divider hidden />
                <SubmitButtons
                    onHandleSubmit={this.handleLogin}
                    onHandleReset={this.handleReset}
                    submitName = 'Login' />
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

export default connect(
    null,
    dispatch => ({
        setUser: user => dispatch({type: 'SET_USER', payload: user})
    })
)(Login);
