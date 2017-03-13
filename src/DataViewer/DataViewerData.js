import React, { Component } from 'react';
import { connect } from 'react-refetch';
import DataViewer from './DataViewer';
import './DataViewerData.css';
import { groupBy, toArray } from 'lodash'
import DataFilters from './DataFilters';

// This component is the smart component for DataViewer which stays a dumb component
class DataViewerData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  groupData (filter, data) {
    return groupBy(data, filter);
  }

  render () {
    const { ordersFetch, filter } = this.props;
    if (ordersFetch.rejected) {
      return <span className='fetch-error'>
        Sorry! This hasn't worked... Refresh the page.
      </span>
    } else if (ordersFetch.fulfilled) {
      const data = this.groupData(filter, ordersFetch.value);
      return <div>
            <DataFilters filter={filter}/>
            <DataViewer
              orders={ ordersFetch.value }
              groupedOrders={ data }
              filter={ filter }>
            </DataViewer>;
          </div>
    } else { //if (ordersFetch.pending) {
      return <div>
            <DataFilters />
            <div className="fetch-pending">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </div>
    }
  }
}

export default connect(props => ({
  ordersFetch: {url: `/api/mock_orders.json`, comparison:`${props.groupBy}:${props.filter}`},
  // likesFetch: `/users/${props.userId}/likes`
}))(DataViewerData)
