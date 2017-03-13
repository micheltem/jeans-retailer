import React from 'react';
import ReactDOM from 'react-dom';
import DataViewer from './DataViewer';
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

describe('DataViewer component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DataViewer orders={[]} groupedOrders={{}}/>, div);
  });

  describe('when rendered', () => {
    beforeEach(() => {
    });

    it('has 8 columns by default', () => {
      let wrapper = shallow(<DataViewer orders={[]} />);
      expect(wrapper.find('.col')).to.have.length(8, 'There should be 8 elements with .col');
    });

    it('has the columns ordered in the right order', ()=> {
      const wrapper = shallow(<DataViewer  orders={[]}/>).find('.row')
      expect(shallow(<DataViewer  orders={[]}/>)
        .find('.col')
        .map(el => el.text())).to.eql(
          ['orderDate', 'deliveryCountry', 'manufacturer', 'gender', 'size', 'colour', 'style', 'count']
        )
    })

    it('renders the same number of rows as orders passed to it', () => {
      const wrapper = mount(<DataViewer orders={fiveOrders} />);
      expect(wrapper.find('.data-row')).to.have.length(5, 'The grid should have 5 rows');
    });

    it('renders the data in the expected columns', () => {
      const wrapper = render(<DataViewer orders={fiveOrders} />);
      expect(wrapper.find('.data-row .col.orderDate')).to.have.length(5, 'orderDate is not found');
      expect(wrapper.find('.data-row .col.deliveryCountry')).to.have.length(5, 'deliveryCountry is not found');
      expect(wrapper.find('.data-row .col.manufacturer')).to.have.length(5, 'deliveryCountry is not found');
      expect(wrapper.find('.data-row .col.gender')).to.have.length(5, 'deliveryCountry is not found');

    });

  })

})
