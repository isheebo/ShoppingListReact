import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../../../components/pagination/Pagination';

describe('<Pagination/> container', () => {
    const details = {
        updateRows: jest.fn(),
    };

    it('renders without crashing', () => {
        const wrapper = shallow(<Pagination {...details} />);
        expect(wrapper.length).toBe(1);
    });
});
