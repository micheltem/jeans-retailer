import React from 'react';
import { shallow, mount, render } from 'enzyme';

import UserIcon from './UserIcon';

describe('UserIcon component', () => {
    it('renders the user\'s classes', () => {
        expect(shallow(<UserIcon />).is('.user-avatar')).toBe(true)
        expect(shallow(<UserIcon />).is('.float-right')).toBe(true)
    });

    it('renders "?" by default if no name supplied', () => {
        expect(shallow(<UserIcon />).contains('?')).toBe(true);
        expect(shallow(<UserIcon />).contains('M')).toBe(false);
    });

    it('renders the first letter of the name supplied', () => {
        expect(shallow(<UserIcon userName="Michel" />).contains('M')).toBe(true);
        expect(shallow(<UserIcon userName="Michel" />).contains('?')).toBe(false);
    });

    it('renders "!" if an empty name is passed', () => {
        expect(shallow(<UserIcon userName="" />).contains('!')).toBe(true);
    });
})
