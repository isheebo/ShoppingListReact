import React from 'react';
import { shallow } from 'enzyme';
import ListDialog from '../../../components/lists/ListDialog';

describe('Test <ListDialog />', () => {
    const props = {
        state: {
            buttonLabel: '',
            dialogTitle: '',
            shoppinglist: {
                name: '',
                notify_date: '',
                date_created: '',
                date_modified: '',
            },
            open: false,
        },
        handleClose: () => {},
        onTextChange: () => {},
        doAction: () => {},
        onDateChange: () => {},
    };

    it('<ListDialog/> renders without crashing', () => {
        const wrapper = shallow(<ListDialog {...props} />);
        expect(wrapper.length).toBe(1);
    });
});
