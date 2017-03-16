import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import DataFilters from './DataFilters';
import sinon from 'sinon';
import { expect } from 'chai';

describe('UserIcon component', () => {

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<DataFilters />, div);
    });

    it('renders the first filter and removes the duplicate in the filter2', () => {
        let filterHtml = render(<DataFilters filter="gender" />).html();
        expect(filterHtml).to.match(/<a>Size<\/a>/);
        expect(filterHtml).not.to.match(/<a>Gender<\/a>/);
        filterHtml = render(<DataFilters filter="size" />).html();
        expect(filterHtml).not.to.match(/<a>Size<\/a>/);
        expect(filterHtml).to.match(/<a>Gender<\/a>/);
    });

    it('renders the 2 filters and removes the duplicate in the filter2', () => {
        let filterHtml = render(<DataFilters filter="gender" filter2="size" />).html();
        expect(filterHtml).to.match(/<a>Size<\/a>/);
        expect(filterHtml).not.to.match(/<a>Gender<\/a>/);
        filterHtml = render(<DataFilters filter="size" filter2="gender"  />).html();
        expect(filterHtml).not.to.match(/<a>Size<\/a>/);
        expect(filterHtml).to.match(/<a>Gender<\/a>/);
    });
})
