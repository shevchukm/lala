import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Checkbox, Menu, Select } from 'semantic-ui-react';

const ActionBar = props => {
    const filterText=`filter by ${props.state.sort}`;
    const options = [
        { value: 'name', text: 'name' },
        { value: 'price', text: 'price' }
    ]
    return(
        <Menu compact borderless>
                <Menu.Item>
                    <Menu.Header>Filters</Menu.Header>
                </Menu.Item>
                <Menu.Item>
                    <Input
                        value={props.state.search}
                        name = "search"
                        onChange={props.onHandleFilters}
                        icon='search'
                        placeholder='Search...'
                    />
                    <Button
                        icon='redo alternate'
                        onClick = {props.handleReset}
                    />
                </Menu.Item>
                <Menu.Item>Stoked</Menu.Item>
                <Menu.Item>
                    <Checkbox
                        toggle
                        name = "isStocked"
                        checked={props.state.isStocked}
                        onChange={props.onHandleFilters}
                    />
                </Menu.Item>
                <Menu.Item>
                    <Select
                        name="sort"
                        text={filterText}
                        icon='filter'
                        floating labeled button
                        className='icon'
                        options={options}
                        onChange={props.onHandleFilters}
                        >
                    </Select>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/goods/add"><Button color="green">add good</Button></Link>
                </Menu.Item>
        </Menu>
    );
};

export default ActionBar;
