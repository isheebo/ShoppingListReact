import React from 'react';
import { shallow } from 'enzyme';
import { SignUpPage } from '../../../containers/auth/SignUpPage';

describe('test <SignUpPage /> container', () => {
    const mockSignupUser = jest.fn();
    let wrapper;

    beforeEach(() => {
        // pass the mock function as the signupUser prop
        // eslint-disable-next-line
        wrapper = shallow(
            <SignUpPage
                signupUser={mockSignupUser}
                isFetching={false}
                history={{ push: jest.fn() }}
            />);
    });
    it('Signup Page should render without crashing', () => {
        expect(wrapper.length).toBe(1);
    });
});
