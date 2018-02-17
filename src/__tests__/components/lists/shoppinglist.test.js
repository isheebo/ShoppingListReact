import React from 'react';
import { shallow } from 'enzyme';
import ShoppingListComponent from '../../../components/lists/ShoppingListComponent';

describe('test <ShoppingListComponent/>', () => {
    const props = {
        shoppinglist: {
            id: 3,
            name: '',
            notify_date: '',
            date_created: '',
            date_modified: '',
        },
        onExecuteAction: jest.fn(),
        handleOpenItemsView: jest.fn(),
    };

    it('renders without crashing', () => {
        const wrapper = shallow(<ShoppingListComponent {...props} />);
        expect(wrapper.length).toBe(1);
    });
});
