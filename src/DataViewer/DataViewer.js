import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import utils from '../common/utils';

const propTypes = {
  orders: PropTypes.array.isRequired,
  groupedOrders: PropTypes.object,
  filter: PropTypes.string
};
const defaultProps = {
  orders: []
};
const columnNames = ['orderDate', 'deliveryCountry', 'manufacturer', 'gender', 'size', 'colour', 'style', 'count'];

import './DataViewer.css';

export default class DataViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderHeaderColumn(columnName) {
    return <div className="col" key={columnName}>{columnName}</div>
  }
  renderOrderRow(order, index) {
    return (
      <div className='data-row' key={order.id}>
        <span className="idx">{index+1}.</span>
        {columnNames.map((column) => this.renderRowColumn(order, column))}
      </div>
    )
  }
  renderRowColumn(order, column) {
    let classes = {col: true}
    classes[column] = true;
    const colour = column === 'colour' ? order.colour : 'transparent';
    const fontColour = column === 'colour' ? '#FFF' : 'inherit';
    return (
      <div className={classNames(classes)}
        style={{backgroundColor:colour, color: fontColour}}
        key={order.id + column}>
        {order[column]}
      </div>
    );
  }
  renderGroupHeaderColumn(filter, items, nested=false) {
    let total = 0,
      groupName = '';
    if(!items.length) {
      Object.keys(items).forEach(g =>{
        items[g].forEach(i=> {
          total += i.count;
          groupName = i[filter];
        });
      });
    } else {
      items.forEach(i => {
        total += i.count;
        groupName = i[filter];
      });
    }
    let classes = classNames({
      col: true,
      'group-header': true,
      'top-level': nested
    })
    return <div className={classes}
          key={groupName}
          onClick={() => { this.setExpandedGroup(groupName) } }>
          <span className="group-name-title col">
            {utils.capitalise(filter)}: {groupName}
          </span>
          {!nested &&
            <span className="col expand">click here to expand/collapse...</span>
          }
          <span className="group-name-count col">Total: {total}</span>
        </div>
  }
  setExpandedGroup(groupName) {
    if(this.state.expanded === groupName) {
      this.setState({expanded: '--none--'});
    } else {
      this.setState({expanded: groupName})
    }
  }
  byCount(a, b) {
    if(this.sum(a) > this.sum(b)) {
      return -1;
    }
    if(this.sum(1) < this.sum(b)) {
      return 1;
    }
    return 0;
  }
  sum(items, prop ='count') {
    let total = 0
    for ( var i = 0, len = items.length; i < len; i++ ) {
        total += items[i][prop]
    }
    return total;
  }
  getOrderedGroupsByCount(items) {
    let list = Object.keys(items|| {}).map((k) => items[k]);
    return list.sort(this.byCount.bind(this));
  }
  renderGroup(items, filter) {
    const key = items[0][filter]
    let classes = {'order-group': true}
    classes['expanded'] = this.state.expanded;
    return (
      <div className={classNames(classes)} key={key+'-'+filter}>
        { this.renderGroupHeaderColumn(filter, items) }
        <div className="orders-list">
          { this.state.expanded === key && items.map((order, i) => this.renderOrderRow(order, i)) }
        </div>
      </div>
    );
  }
  render() {
    const { orders, filter, filter2 } = this.props;
    const groupedOrders = utils.groupData(orders, filter, filter2);
    return (
      <div className="data-viewer">
        <div className="header-row">
          { columnNames.map( (name) => this.renderHeaderColumn(name) ) }
        </div>
        {   /* No groups */
          !filter && orders.map( (order, i) => this.renderOrderRow(order, i) )
        }
        {   /* 1 group level */
          !filter2 && filter && this.getOrderedGroupsByCount(groupedOrders).map( (group) => {
            return this.renderGroup(group, filter);
          })
        }
        {   /* 2 group levels */
          filter2 && this.getOrderedGroupsByCount(groupedOrders).map( (group) => {
            let rows = [ this.renderGroupHeaderColumn(filter, group, true) ];
            let children = [];
            this.getOrderedGroupsByCount(group).forEach( (group2) => {
              children = children.concat(this.renderGroup(group2, filter2))
            })
            let div = <div className="children">{ children } </div>
            rows.push(div);
            return rows;
          })
        }
      </div>
    );
  }
}

DataViewer.propTypes = propTypes;
DataViewer.defaultProps = defaultProps;
