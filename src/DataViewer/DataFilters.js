import React, { Component, PropTypes,  State } from 'react';
import { Link } from 'react-router';
import './data-filters.css';

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
  isActive(item) {
    // return this.state.isActive(item)
    return true
  }
  render() {
    const filter =  this.props;
    return (
      <div className="data-filters">
        <div>
          <h1>Group by:</h1>
          <ul>
            <li><Link name="none" activeClassName="active" to="/">No Filter</Link></li>
            <li><Link name="gender" activeClassName="active" to="/filter/gender">Gender</Link></li>
            <li><Link name="size" activeClassName="active" to="/filter/size">Size</Link></li>
            <li><Link name="colour" activeClassName="active" to="/filter/colour">Colour</Link></li>
          </ul>
        </div>
        <div>
          <h1>...and then by:</h1>
          <ul>
            <li><Link activeClassName="active" to={this.getUrlWith('manufacturer')}>manufacturer</Link></li>
            <li><Link activeClassName="active" to={this.getUrlWith('style')}>style</Link></li>
            <li><Link activeClassName="active" to={this.getUrlWith('deliveryCountry')}>deliveryCountry</Link></li>
          </ul>
        </div>
      </div>
    );
  }

}

DataFilters.propTypes = propTypes;
DataFilters.defaultProps = defaultProps;
