import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from '../../../components/SearchBar';

describe('Test <SearchBar />', () => {
    const props = {
        onQueryChange: jest.fn(),
        loogut: jest.fn(),
    };
    it('<SearchBar/> renders without crashing', () => {
        const wrapper = shallow(<SearchBar {...props} />);
        expect(wrapper.length).toBe(1);
    });
});
