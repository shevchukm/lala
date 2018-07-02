import React from 'react';
import { Table, Button, Icon} from 'semantic-ui-react';

const ItemsList = props => {
    
    const headers = props.headers.map((header, index) => (
        <Table.HeaderCell key={index}>{header}</Table.HeaderCell>
    ));

    const items = (props.items === null || props.items.length === 0) ?
        <Table.Row>
            <Table.HeaderCell>it's empty</Table.HeaderCell>
        </Table.Row>
    :
        props.items.map(item => {

            return <Table.Row key={item._id}>
                {
                    Object.keys(item).map((field, index) => (
                        <Table.Cell key={index}>{item[field].toString()}</Table.Cell>
                    ))
                }

                <Table.Cell>
                {
                    props.onHandleDelete &&
                    <Button type="button"
                            onClick={() => props.onHandleDelete(item._id)}
                            icon
                            color="red">
                        <Icon name='delete' />
                    </Button>
                }

                    {
                    props.onHandleAddToCart && 
                        <Button type="button"
                            onClick={() => props.onHandleAddToCart({...item})}
                            icon
                            color="green">
                            <Icon name='add to cart' />
                        </Button>
                    }
                </Table.Cell>
            </Table.Row >
        });

    return(
        <Table basic='very' celled collapsing>

             <Table.Header>
                <Table.Row>
                    {headers}
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {items}
            </Table.Body>
        </Table>
    );
};

export default ItemsList;
