import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../../containers/auth/LoginPage';

describe('test <LoginPage /> container', () => {
    const mockLoginuser = jest.fn();
    let wrapper;

    beforeEach(() => {
        // eslint-disable-next-line
        wrapper = shallow(
            <LoginPage
                loginUser={mockLoginuser}
                isFetching={false}
                isAuthenticated={false}
                history={{ push: jest.fn() }}
            />);
    });
    it('Signup Page should render without crashing', () => {
        expect(wrapper.length).toBe(1);
    });
});
