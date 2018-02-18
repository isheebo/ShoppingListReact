import React from 'react';
import { shallow } from 'enzyme';
import { SnackBar } from '../../../containers/utils/SnackBar';

describe('test <SnackBar/>', () => {
    const mockDismissSnackbar = jest.fn();
    const props = { isSnackBarActive: false, snackMessage: '' };
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<SnackBar dismissSnackbar={mockDismissSnackbar} {...props} />);
    });

    it('renders without crashing', () => {
        expect(wrapper.length).toBe(1);
    });
});
