import React, { Component } from 'react';
import { connect } from 'react-refetch';
import DataViewer from './DataViewer';
import './DataViewerData.css';
import DataFilters from './DataFilters';
import utils from '../common/utils';

// This component is the smart component for DataViewer which stays a dumb component
class DataViewerData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    const { ordersFetch, filter, filter2 } = this.props;
    if (ordersFetch.rejected) {
      return <span className='fetch-error'>
        Sorry! This hasn't worked... Refresh the page.
      </span>
    } else if (ordersFetch.fulfilled) {
      const data = (ordersFetch.value || []).map(utils.enrich);
      return <div  className="fetch-fulfilled">
            <DataFilters filter={filter} filter2={filter2}/>
            <DataViewer
              orders={ data }
              filter={ filter }
              filter2={ filter2 }>
            </DataViewer>
          </div>
    } else {
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
  ordersFetch: {url: `/api/mock_orders.json`, comparison:`${props.filter}:${props.filter2}`},
}))(DataViewerData)
