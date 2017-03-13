import React, { Component, PropTypes, } from 'react';
import { Link } from 'react-router';
import './data-filters.css';

const propTypes = {};

const defaultProps = {};

export default class DataFilters extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="data-filters">
        <h1>Group by:</h1>
        <ul>
          <li><Link activeClassName="active" to="/">No Filter</Link></li>
          <li><Link activeClassName="active" to="/filter/gender">Gender</Link></li>
          <li><Link activeClassName="active" to="/filter/size">Size</Link></li>
          <li><Link activeClassName="active" to="/filter/colour">Colour</Link></li>
        </ul>
        {/* <h1>And then by</h1> */}


      </div>
    );
  }

}

DataFilters.propTypes = propTypes;
DataFilters.defaultProps = defaultProps;
