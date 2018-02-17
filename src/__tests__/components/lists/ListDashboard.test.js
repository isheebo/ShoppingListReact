import React from 'react';
import { shallow } from 'enzyme';
import ListDashboard from '../../../components/lists/ListDashboard';

describe('test <ListDashboard/>', () => {
    const props = {
        shoppinglists: [
            {
                id: 2,
                name: '',
                notify_date: '',
                date_created: '',
                date_modified: '',
            },
        ],
        history: {},
        searchQuery: '',
        isFetching: false,
        numberOfListsPerPage: 3,
        page: 1,
        onUpdateRows: jest.fn(),
        onExecuteAction: jest.fn(),
        handleOpenItemsView: jest.fn(),
    };

    it('renders without crashing', () => {
        const wrapper = shallow(<ListDashboard {...props} />);
        expect(wrapper.length).toBe(1);
    });
});
