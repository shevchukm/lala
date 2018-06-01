import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({adapter: new Adapter()});

import GoodsList from './GoodsList';

test('reset button clicks', () => {
    const component = renderer.create(
        <GoodsList />,
    );
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();

    const mylist = shallow(<GoodsList />);
    
    mylist.setState({search: 'mishalala'});
    mylist.find('button').simulate('click');
    expect(mylist.state().search).toEqual('');
});

test('reset button clicks', () => {
    
    const mylist = shallow(<GoodsList />);
    
    mylist.setState({search: 'mishalala'});
    mylist.find('button').simulate('click');
    expect(mylist.state().search).toEqual('');
});
