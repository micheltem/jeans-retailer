import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

describe('The App top level component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('closes and opens the tags section', ()=> {
    const wrapper = mount(<App />);
    expect(wrapper.html()).not.to.contain('<a class="show">Show Tags...</a>');
    expect(wrapper.html()).to.contain('<a class="hide">Hide Tags...</a>');
    wrapper.find('.hide').simulate('click');
    expect(wrapper.html()).to.contain('<a class="show">Show Tags...</a>');
    expect(wrapper.html()).not.to.contain('<a class="hide">Hide Tags...</a>');
    wrapper.find('.show').simulate('click');
    expect(wrapper.html()).not.to.contain('<a class="show">Show Tags...</a>');
    expect(wrapper.html()).to.contain('<a class="hide">Hide Tags...</a>');
  });
})
