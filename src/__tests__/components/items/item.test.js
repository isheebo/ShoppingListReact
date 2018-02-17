import React from 'react';
import { shallow } from 'enzyme';
import Item from '../../../components/items/Item';

describe('test <Item/>', () => {
    const props = {
        item: {
            name: '',
            quantity: '12',
            price: '123',
            has_been_bought: false,
            date_created: '',
            date_modified: '',
        },
        onExecuteAction: jest.fn(),
    };

    it('renders without crashing', () => {
        const wrapper = shallow(<Item {...props} />);
        expect(wrapper.length).toBe(1);
    });
});
