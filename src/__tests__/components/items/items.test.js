import React from 'react';
import { shallow } from 'enzyme';
import Items from '../../../components/items/Items';

describe('test <Item/>', () => {
    const props = {
        listItems: [
            {
                name: '',
                quantity: '12',
                price: '123',
                has_been_bought: false,
                date_created: '',
                date_modified: '',
            },
        ],
        listName: '',
        searchQuery: '',
        isFetching: false,
        numberOfItemsPerPage: 3,
        page: 1,
        onUpdateRows: () => {},
        onExecuteAction: () => {},
    };

    it('renders without crashing', () => {
        const wrapper = shallow(<Items {...props} />);
        expect(wrapper.length).toBe(1);
    });
});
