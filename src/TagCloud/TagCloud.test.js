import React from 'react';
import ReactDOM from 'react-dom';
import TagCloud from './TagCloud';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

const fiveOrders = [
  {"id":2,"orderDate":"20/04/2016","deliveryCountry":"China","manufacturer":"Diesel","gender":"M","size":22,"colour":"#3B86E3","style":"Relaxed Fit","count":1},
  {"id":3,"orderDate":"15/05/2016","deliveryCountry":"China","manufacturer":"LA Denim Atelier","gender":"F","size":13,"colour":"#004397","style":"Skinny","count":4},
  {"id":4,"orderDate":"25/10/2016","deliveryCountry":"United States","manufacturer":"Serfontaine","gender":"F","size":38,"colour":"#8FC1FF","style":"Low-Rise","count":17},
  {"id":5,"orderDate":"06/05/2016","deliveryCountry":"China","manufacturer":"dvb – Denim","gender":"M","size":15,"colour":"#414073","style":"Skinny","count":19},
  {"id":6,"orderDate":"15/01/2017","deliveryCountry":"China","manufacturer":"Lee Jeans","gender":"M","size":35,"colour":"#003270","style":"Washed Denim","count":11}
];

describe('The TagCloud component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TagCloud />, div);
  });

  it('renders a waiting message when there the query is not resolved', () => {
    const wrapper = render(<TagCloud ordersFetch={{pending: true}} />);
    expect(wrapper.text()).to.contain('Loading...');
  });

  it('gets the most popular groups', () => {
    const wrapper = mount(<TagCloud ordersFetch={{fulfilled: true, value:fiveOrders}} filter="size"/>);
    expect(wrapper.text()).to.contain('35-(11)');
    expect(wrapper.text()).to.contain('38-(17)');
    expect(wrapper.text()).to.contain('15-(19)');
    expect(wrapper.text()).to.contain('22-(1)');
    expect(wrapper.text()).to.contain('13-(4)');
  });

  it('is clickable', () => {
    const spy = sinon.spy();
    const wrapper = mount(<TagCloud
      ordersFetch={{fulfilled: true, value:fiveOrders}}
      filter="size"
      onClick={spy}/>);
    wrapper.find('.tag-cloud-tag').first().simulate('click');
    expect(spy.callCount).to.equal(1);
  })
})
