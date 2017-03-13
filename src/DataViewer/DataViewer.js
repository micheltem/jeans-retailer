import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';



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
    return (
      <div className={classNames(classes)}
        key={order.id + column}>
        {order[column]}
      </div>
    );
  }
  capitalise(string) {
    if(!string || !string.length) {
      return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  renderGroupHeaderColumn(groupName, filter, items) {
    let total = 0;
    items.map(i => total += i.count);
    return <div className="col group-header"
          key={groupName}
          onClick={() => {
            if(this.state.expanded === groupName) {
              this.setState({expanded: '--none--'});
            } else {
              this.setState({expanded: groupName})}
            }
          }>
          <span className="group-name-title col">
            {this.capitalise(filter)}: {groupName}
          </span>
          <span className="col expand">click here to expand/collapse...</span>
          <span className="group-name-count col">Total: {total}</span>
        </div>
  }

  renderGroup(key, groupedOrders, filter) {
    const items = groupedOrders[key];
    let classes = {'order-group': true}
    classes['expanded'] = this.state.expanded;
    return (
      <div className={classNames(classes)} key={key}>
        { this.renderGroupHeaderColumn(key, filter, items) }
        <div className="orders-list">
          { this.state.expanded == key && items.map( (order, i) => this.renderOrderRow(order, i)) }
        </div>
      </div>
    );
  }

  render() {
    const {orders, groupedOrders, filter} = this.props;
    return (
      <div className="data-viewer">
        <div className="header-row">
          { columnNames.map( (name) => this.renderHeaderColumn(name) ) }
        </div>
        {/* No groups */}
        { !filter && orders.map( (order, i) => this.renderOrderRow(order, i) ) }
        {/* 1 group level */}
        { Object.keys(groupedOrders|| {}).map( (key) => {
            return this.renderGroup(key, groupedOrders, filter)
          })
        }
      </div>
    );
  }
}

DataViewer.propTypes = propTypes;
DataViewer.defaultProps = defaultProps;
