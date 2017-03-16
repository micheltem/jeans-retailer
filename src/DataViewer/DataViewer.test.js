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

const groupedOrdersLevel1 = [
  { "id": 198, "orderDate": "22/09/2016", "deliveryCountry": "China", "manufacturer": "Lee Jeans", "gender": "M", "size": 12, "colour": "#00214A", "style": "Low-Rise", "count": 23 },
  { "id": 152, "orderDate": "08/07/2016", "deliveryCountry": "United Kingdom", "manufacturer": "Earl Jeans", "gender": "M", "size": 12, "colour": "#69ACFF", "style": "Raw Denim", "count": 22 },
  { "id": 190, "orderDate": "19/11/2016", "deliveryCountry": "China", "manufacturer": "Sugarcane", "gender": "M", "size": 12, "colour": "#4C3957", "style": "Slim Fit", "count": 22 },
  { "id": 410, "orderDate": "27/06/2016", "deliveryCountry": "China", "manufacturer": "Diesel", "gender": "F", "size": 12, "colour": "#3B86E3", "style": "Skinny", "count": 23 },
  { "id": 907, "orderDate": "27/06/2016", "deliveryCountry": "China", "manufacturer": "Siwy Denim", "gender": "F", "size": 12, "colour": "#79B473", "style": "Bootcut", "count": 22 },
  { "id": 553, "orderDate": "11/12/2016", "deliveryCountry": "United States", "manufacturer": "True Religion", "gender": "F", "size": 12, "colour": "#3B86E3", "style": "Bootcut", "count": 19 },
  { "id": 529, "orderDate": "19/02/2017", "deliveryCountry": "United States", "manufacturer": "True Religion", "gender": "F", "size": 12, "colour": "#00214A", "style": "Skinny", "count": 19 },
  { "id": 560, "orderDate": "10/04/2016", "deliveryCountry": "China", "manufacturer": "Earl Jeans", "gender": "F", "size": 13, "colour": "#4C3957", "style": "Bootcut", "count": 23 },
  { "id": 932, "orderDate": "01/12/2016", "deliveryCountry": "China", "manufacturer": "Earl Jeans", "gender": "F", "size": 13, "colour": "#4e6590", "style": "Low-Rise", "count": 23 },
  { "id": 904, "orderDate": "26/10/2016", "deliveryCountry": "China", "manufacturer": "Serfontaine", "gender": "M", "size": 13, "colour": "#000", "style": "Washed Denim", "count": 23 },
  { "id": 626, "orderDate": "14/07/2016", "deliveryCountry": "France", "manufacturer": "Diesel", "gender": "M", "size": 13, "colour": "#4C3957", "style": "Slim Fit", "count": 22 },
  { "id": 379, "orderDate": "17/03/2016", "deliveryCountry": "China", "manufacturer": "Siwy Denim", "gender": "M", "size": 13, "colour": "#004397", "style": "Low-Rise", "count": 20 }
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

    it('renders the first level grouping', () => {
      const wrapper = render(<DataViewer orders={groupedOrdersLevel1} filter="size" />);
      expect(wrapper.find('.header-row')).to.have.length(1);
      expect(wrapper.find('.order-group')).to.have.length(2);
    });

    it('renders the second level grouping', () => {
      const wrapper = render(<DataViewer orders={groupedOrdersLevel1} filter="size" filter2="gender"/>);
      expect(wrapper.find('.header-row')).to.have.length(1);
      expect(wrapper.find('.order-group')).to.have.length(4);
    });

    it('expands the group on', () => {
      const wrapper = mount(<DataViewer orders={groupedOrdersLevel1} filter="size" filter2="gender"/>);
      expect(wrapper.find('.header-row')).to.have.length(1);
      expect(wrapper.find('.order-group')).to.have.length(4);
      wrapper.find('.header-row').simulate('click');
    });

    it('renders a row correctly', () => {
      const order = {"id":6,"orderDate":"15/01/2017","deliveryCountry":"China","manufacturer":"Lee Jeans","gender":"M","size":35,"colour":"#003270","style":"Washed Denim","count":11};
      const d = new DataViewer().renderOrderRow(order, 3);
      expect(render(d).html()).to.contain('<span class="idx">4.</span');
    });

  })

})
