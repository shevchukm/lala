import React, { Component } from 'react';
import { Container, Message } from 'semantic-ui-react';
import { getAll, deleteOne } from '../api/actionsUsers';
import ItemsList from '../shared/ItemsList';

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
        getAll()
        .then(res => this.setState({ users: res.data }))
        .catch(()=>this.setState({error: 'some problems with connection'}));
    };

    handleDelete = id => {
        deleteOne(id).then(() => this.getAll())
        .catch( err => this.setState({ error: err.response.data }));
    };

    render() {
        return(
            <Container>        
                <ItemsList 
                    headers={['ID', 'Name', 'Email','Email comfirmed' ,'Delete']}
                    items={this.state.users}
                    onHandleDelete={this.handleDelete}/>

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
