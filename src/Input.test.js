import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import Input from './Input';

/**
 * setup function for Input component
 * @returns {ShallowWrapper}
 */
const setup = () => {
    return shallow(<Input />);
};

test('Input renders without errors', ()=>{
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-input');
    expect(component.length).toBe(1);
});