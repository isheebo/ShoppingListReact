import React from 'react';
import { shallow } from 'enzyme';
import { ResetPasswordPage } from '../../../containers/auth/ResetPasswordPage';

describe('test <ResetPasswordPage /> container', () => {
    const mockResetUserPassword = jest.fn();
    let wrapper;

    beforeEach(() => {
        // eslint-disable-next-line
        wrapper = shallow(
            <ResetPasswordPage
                resetUserPassword={mockResetUserPassword}
                isFetching={false}
                isAuthenticated={false}
                history={{ push: jest.fn() }}
            />);
    });
    it('Signup Page should render without crashing', () => {
        expect(wrapper.length).toBe(1);
    });
});
