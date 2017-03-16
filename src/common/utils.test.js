import React from 'react';
import ReactDOM from 'react-dom';
import utils from './utils';
import sinon from 'sinon';
import { expect } from 'chai';

const threeOrders = [
  {"id":2,"orderDate":"20/04/2016","deliveryCountry":"China","manufacturer":"Diesel","gender":"M","size":22,"colour":"#3B86E3","style":"Relaxed Fit","count":1},
  {"id":3,"orderDate":"15/05/2016","deliveryCountry":"China","manufacturer":"LA Denim Atelier","gender":"F","size":13,"colour":"#004397","style":"Skinny","count":4},
  {"id":4,"orderDate":"25/10/2016","deliveryCountry":"United States","manufacturer":"Serfontaine","gender":"F","size":13,"colour":"#8FC1FF","style":"Low-Rise","count":17},
];

describe('The utils ', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<utils />, div);
  });

  it('capitalises the first letter', () => {
    expect(utils.capitalise('yolo')).to.equal('Yolo');
  });

  it('does not throw if nothing is passed to capitalise', () => {
    expect(utils.capitalise('')).to.equal('');
  });

  it('groups data by tag' , () => {
    const data = utils.groupDataByTag(threeOrders, 'gender', 'size');
    expect(data['M_22']).to.have.length(1);
    expect(data['F_13']).to.have.length(2);
  });
})
