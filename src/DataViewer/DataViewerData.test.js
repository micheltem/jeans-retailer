import React from 'react';
import ReactDOM from 'react-dom';
import DataViewerData from './DataViewerData';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

const component = null;
const fiveOrders = [
  {"id":2,"orderDate":"20/04/2016","deliveryCountry":"China","manufacturer":"Diesel","gender":"M","size":22,"colour":"#3B86E3","style":"Relaxed Fit","count":1},
  {"id":3,"orderDate":"15/05/2016","deliveryCountry":"China","manufacturer":"LA Denim Atelier","gender":"F","size":13,"colour":"#004397","style":"Skinny","count":4},
  {"id":4,"orderDate":"25/10/2016","deliveryCountry":"United States","manufacturer":"Serfontaine","gender":"F","size":38,"colour":"#8FC1FF","style":"Low-Rise","count":17},
  {"id":5,"orderDate":"06/05/2016","deliveryCountry":"China","manufacturer":"dvb – Denim","gender":"M","size":15,"colour":"#414073","style":"Skinny","count":19},
  {"id":6,"orderDate":"15/01/2017","deliveryCountry":"China","manufacturer":"Lee Jeans","gender":"M","size":35,"colour":"#003270","style":"Washed Denim","count":11}
];

describe('DataViewerData component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DataViewerData ordersFetch={{rejected: true}}/>, div);
  });

  it('prints an error when the data query is rejected', () => {
    const wrapper = render(<DataViewerData ordersFetch={{rejected: true}} />)
    expect(wrapper.find('.fetch-error')).to.have.length(1);
  });

  it('prints the data rows when the query is done', () => {
    const wrapper = mount(<DataViewerData ordersFetch={{fulfilled: true}} />)
    expect(wrapper.html()).to.contain('fetch-fulfilled', 'Cannot find .fetch-fulfilled');
  });

  it('prints the throbber when the query is outstanding', () => {
    const wrapper = mount(<DataViewerData ordersFetch={{pending: true}} />)
    expect(wrapper.find('.fetch-pending')).to.have.length(1, 'Cannot find .fullfilled');
  });

})
