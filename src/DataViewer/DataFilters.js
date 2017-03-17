import React, { Component } from 'react';
import { Link } from 'react-router';
import './data-filters.css';
import utils from '../common/utils';

const propTypes = {};

const defaultProps = {};

export default class DataFilters extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  getUrlWith(filter2) {
    return `/filter/${this.props.filter}/and/${filter2}`;
  }
  renderLink(name, filter, filter2) {
    const to = "/filter/" + name;
    if(!filter2) {
      return <li><Link name={name} activeClassName="active" to={to}>{utils.capitalise(name)}</Link></li>
    } else if(filter && filter2 && (filter2.toLowerCase() !== filter.toLowerCase())) {
      return <li><Link activeClassName="active" to={this.getUrlWith(name)}>{utils.capitalise(name)}</Link></li>
    } else {
      return <span></span>;
    }
  }
  render() {
    const { filter } =  this.props;
    return (
      <div className="data-filters">
        <div>
          <h1>Group by:</h1>
          <ul>
            <li><Link name="none" activeClassName="active" to="/">No Filter</Link></li>
            { this.renderLink('deliveryCountry', filter) }
            { this.renderLink('manufacturer', filter) }
            { this.renderLink('gender', filter) }
            { this.renderLink('size', filter) }
            { this.renderLink('colour', filter) }
            { this.renderLink('style', filter) }
            { this.renderLink('month', filter) }
          </ul>
        </div>
        <div>
          <h1>...and then by:</h1>
          <ul>
            { this.renderLink('deliveryCountry', filter, 'deliveryCountry') }
            { this.renderLink('manufacturer', filter, 'manufacturer') }
            { this.renderLink('gender', filter, 'gender') }
            { this.renderLink('size', filter, 'size') }
            { this.renderLink('colour', filter, 'colour') }
            { this.renderLink('style', filter, 'style') }
            { this.renderLink('month', filter, 'month') }
          </ul>
        </div>
      </div>
    );
  }

}

DataFilters.propTypes = propTypes;
DataFilters.defaultProps = defaultProps;
