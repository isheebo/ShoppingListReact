import React from 'react';
import { shallow } from 'enzyme';
import SignUpForm from '../../../components/auth/SignUpForm';

describe('test <SignUpPage /> container', () => {
    const details = {
        isFetching: false,
        credentials: {
            email: 'abc@example.org',
            password: 'abcdef',
            confirmPassword: 'abcdef',
        },
        validationErrors: {},
        onFormSubmit: () => {},
        onFieldChange: () => {},
    };
    it('Signup Page should render without crashing', () => {
        const wrapper = shallow(<SignUpForm {...details} />);
        expect(wrapper.length).toBe(1);
    });

    it('should display the h2 title', () => {
        const wrapper = shallow(<SignUpForm {...details} />);
        expect(wrapper.containsMatchingElement(<h2>Sign Up </h2>)).toBeTruthy();
    });
});
