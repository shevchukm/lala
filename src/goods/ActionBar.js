import React from 'react';

const ActionBar = props => {
    return(
        <div>
             search
            <input
                value={props.state.search}
                name = "search"
                onChange={props.handleFilters}
                type="text" />
            <button
                onClick = {props.handleReset} > reset </button>
            stoked:
            <input
                type="checkbox"
                name = "isStocked"
                checked={props.state.isStocked}
                onChange={props.handleFilters} />
            sort by 
            <select 
                name = "sort"
                onChange={props.handleFilters}
                value={props.state.sort}>
                <option value="name">name</option>
                <option value="price">price</option>
            </select>
        </div>
    );
};

export default ActionBar;
