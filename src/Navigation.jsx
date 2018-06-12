import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Menu, Container} from 'semantic-ui-react';

const Navigation = (props) => {
    const handleLogOut = () => {
        sessionStorage.removeItem('token');
        props.history.push("/login");
    };

    const token = sessionStorage.getItem('token');

        const auth =  token ? 
            <Menu.Menu position='right'>
                <Menu.Item onClick={handleLogOut}>Log out</Menu.Item>
            </ Menu.Menu>
            :
            <Menu.Menu position='right'>
                <Menu.Item><Link to="/login">Login</Link></Menu.Item>
                <Menu.Item><Link to="/reg">Registration</Link></Menu.Item>
            </ Menu.Menu>

    return(
        <Menu inverted>
            <Container>
                <Menu.Item><Link to="/">Home</Link></Menu.Item>
                <Menu.Item><Link to="/users">Users</Link></Menu.Item>
                {auth}
            </Container>
        </Menu>
    );
};
export default withRouter(Navigation);
