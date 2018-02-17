import React from 'react';
import { shallow } from 'enzyme';
import ResetPasswordForm from '../../../components/auth/ResetPasswordForm';

describe('test <ResetPasswordForm /> container', () => {
    const details = {
        isFetching: false,
        credentials: {
            password: 'abcdef',
            confirmPassword: 'abcdef',
        },
        validationErrors: {},
        onFormSubmit: jest.fn(),
        onFieldChange: jest.fn(),
    };
    it('Signup Page should render without crashing', () => {
        const wrapper = shallow(<ResetPasswordForm {...details} />);
        expect(wrapper.length).toBe(1);
    });

    it('should display the h2 title', () => {
        const wrapper = shallow(<ResetPasswordForm {...details} />);
        expect(wrapper.containsMatchingElement(<h2> Reset Password</h2>)).toBeTruthy();
    });
});
