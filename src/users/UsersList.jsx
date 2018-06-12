import React, { Component } from 'react';
import { getAll, deleteOne } from '../actions/actionsUsers';
import { Table, Container, Button, Icon, Message } from 'semantic-ui-react';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            error: ''
        };

    };
  
    componentDidMount() {
        this.getAll();
    };

    getAll = () => {
        getAll().then(res => this.setState({ users: res.data }))
        .catch(()=>this.setState({error: 'some problems with connection'}));
    };

    handleDelete = id => {
        deleteOne(id).then(() => this.getAll())
        .catch( err => this.setState({ error: err.response.data }));
    };

    render() {
        const users = this.state.users.map( user =>
                <Table.Row key={user.id}>
                    <Table.Cell>
                        {user.id}
                    </Table.Cell>
                    <Table.Cell>
                        {user.name}  
                    </Table.Cell >
                    <Table.Cell>
                        {user.email}
                    </Table.Cell>
                    <Table.Cell>
                        <Button type="button"
                                onClick={() => this.handleDelete(user.id)}
                                icon
                                color="red">
                            <Icon name='delete' />
                        </Button>
                    </Table.Cell>
                </Table.Row >

        );

        return(
            <Container>        
                <Table basic='very' celled collapsing>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {users}
                    </Table.Body>
                </Table>
                { this.state.error &&
                    <Message warning compact>
                        <Message.Header>Error has occured</Message.Header>
                        <p>{this.state.error}</p>
                    </Message>
                }
            </Container>
        );
    }
}

export default UserList;
