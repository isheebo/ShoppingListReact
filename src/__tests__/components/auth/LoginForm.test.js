import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../../../components/auth/LoginForm';

describe('test <SignUpPage /> container', () => {
    const details = {
        isFetching: false,
        credentials: {
            email: 'abc@example.org',
            password: 'abcdef',
        },
        validationErrors: {},
        onFormSubmit: () => {},
        onFieldChange: () => {},
    };
    it('Signup Page should render without crashing', () => {
        const wrapper = shallow(<LoginForm {...details} />);
        expect(wrapper.length).toBe(1);
    });

    it('should display the h2 title', () => {
        const wrapper = shallow(<LoginForm {...details} />);
        expect(wrapper.containsMatchingElement(<h2> Login</h2>)).toBeTruthy();
    });
});
