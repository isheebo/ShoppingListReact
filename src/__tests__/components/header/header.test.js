import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../../components/Header/Header';

describe('Test <Header />', () => {
    it('<Header/> renders without crashing', () => {
        const wrapper = shallow(<Header title="" />);
        expect(wrapper.length).toBe(1);
    });
});
