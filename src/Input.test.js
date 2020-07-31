import React from 'react';
import {mount} from 'enzyme';
import { findByTestAttr, checkProps } from '../test/testUtils';
import Input from './Input';
import LanguageContext from './contexts/LanguageContext';

/**
 * create ReactWrapper for Input component for testing
 * @param {object} testValues - Context and props values for this specific test
 * @returns {ReactWrapper} - wrapper for Input component and providers
 */
const setup = ({ language, secretWord }) => {
    language = language || "en";
    secretWord = secretWord || "party"
    return mount(
        <LanguageContext.Provider value={language} >
            <Input secretWord={secretWord}/>
        </LanguageContext.Provider>  
    );
};

test('Input renders without errors', ()=>{
    const wrapper = setup({});
    const component = findByTestAttr(wrapper, 'component-input');
    expect(component.length).toBe(1);
});

test('does not throw warning with expected props', () => {
    checkProps(Input, { secretWord: "party"});
});

describe('state controlled input field', () => {
    let mockSetCurrentGuess = jest.fn();
    let wrapper
    beforeEach(() => {
        mockSetCurrentGuess.mockClear();
        React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
        wrapper = setup({});
    });
    test('state updates with value of input box upon change', () => {
        const inputBox = findByTestAttr(wrapper, 'input-box');

        const mockEvent = { target: {value: 'train'}};
        inputBox.simulate("change", mockEvent);

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
    });
    test('field is cleared upon submit button click', () => {
        const submitButton = findByTestAttr(wrapper, 'submit-button');

        submitButton.simulate('click', {preventDefault() {}});
        expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
    });
});

describe('languagePicker', () => {
    test('correctly renders submit in English', () => {
        const wrapper = setup({ language: "en" });
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        expect(submitButton.text()).toBe('Submit');
    });

    test('correctly renders congrats string in emoji', () => {
        const wrapper = setup({ language: "emoji" });
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        expect(submitButton.text()).toBe('🚀');
    });
});