import React from 'react';
import { shallow } from 'enzyme';
import ItemDialog from '../../../components/items/ItemDialog';

describe('Test <ItemDialog />', () => {
    const props = {
        state: {
            buttonLabel: '',
            dialogTitle: '',
            item: {
                name: '',
                quantity: '12',
                price: '123',
                has_been_bought: false,
                date_created: '',
                date_modified: '',
            },
            open: false,
            priceErrorText: '',
            quantityErrorText: '',
        },
        handleClose: jest.fn(),
        onTextChange: jest.fn(),
        doAction: jest.fn(),
        onCheck: jest.fn(),
        onPriceError: jest.fn(),
        onQuantityError: jest.fn(),
    };

    it('<ItemDialog/> renders without crashing', () => {
        const wrapper = shallow(<ItemDialog {...props} />);
        expect(wrapper.length).toBe(1);
    });
});
