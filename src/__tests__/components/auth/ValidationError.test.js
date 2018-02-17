import React from 'react';
import { shallow } from 'enzyme';
import ValidationError from '../../../components/auth/ValidationError';

describe('<ValidationError/>', () => {
    it('should render without crashing', () => {
        const wrapper = shallow(<ValidationError />);
        expect(wrapper.length).toBe(1);
    });
});
