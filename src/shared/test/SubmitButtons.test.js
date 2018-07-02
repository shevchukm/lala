import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SubmitButtons from '../SubmitButtons';

configure({ adapter: new Adapter() });

describe('Submit buttons component', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<SubmitButtons />);

        expect(wrapper).toMatchSnapshot();
    });

    it('executes reset function on click', () => {
        const onResetMock = jest.fn();

        const wrapper = shallow(<SubmitButtons onHandleReset={onResetMock} />);

        const resetButton = wrapper.find('Button').first();

        resetButton.simulate('click');

        expect(onResetMock).toHaveBeenCalledTimes(1);
    });

    it('executes submit function on click', () => {
        const onSubmitMock = jest.fn();
        const wrapper = shallow(<SubmitButtons onHandleSubmit={onSubmitMock} />);
        const sumbitButton = wrapper.find('[positive=true]');

        sumbitButton.simulate('click');

        expect(onSubmitMock).toHaveBeenCalledTimes(1);
    });

    it('has submit button with name from props', () => {
        const wrapper = shallow(<SubmitButtons submitName="some test name" />);
        const sumbitButton = wrapper.find('[positive=true]');

        expect(sumbitButton.children().text()).toEqual('some test name');
    });

    it('has submit button with default name if props empy', () => {
        const wrapper = shallow(<SubmitButtons />);
        const sumbitButton = wrapper.find('[positive=true]');

        expect(sumbitButton.children().text()).toEqual('Submit');
    });
});
