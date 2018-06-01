import React, {Component} from 'react';
import Axios from 'axios';

const initState = {
    category: '',
    price: '',
    stocked: false,
    name: ''
};

class AddGood extends Component {

    constructor(props) {
        super(props);
        this.state = initState;
    }

    handleChange = (e) => {
        e.target.type === 'checkbox' ?
            this.setState({[e.target.name]: e.target.checked}) : this.setState({[e.target.name]: e.target.value});
    }

    handleCreate = () => {
        Axios.post('http://localhost:3012/goods', this.state)
            .then(() =>{
                this.setState(initState);
                this.props.update();
            });
    }
    render() {
        return(
            <div>
               category:
                <input
                    type="text" 
                    value={this.state.category} 
                    name="category" 
                    onChange={this.handleChange} />
               price: 
                <input
                    type="text"
                    value={this.state.price}
                    name="price"
                    onChange={this.handleChange} />
               stocked: 
                <input
                    type="checkbox"
                    checked={this.state.stocked}
                    name="stocked"
                    onChange={this.handleChange} />
               name: 
                <input
                    type="text"
                    value={this.state.name}
                    name="name"
                    onChange={this.handleChange} />
                <input 
                    type="button"
                    value="add good"
                    onClick={this.handleCreate} /> 
            </div>
        );
    }
}

export default AddGood;
