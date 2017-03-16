import React, { Component } from 'react';
import { TagCloud } from "react-tagcloud";
import { connect } from 'react-refetch';
import { take } from 'lodash';
import utils from '../common/utils';

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getMostPopular(data) {
    const {filter, filter2} = this.props;
    let grouped = utils.groupDataByTag(data, filter, filter2);
    let result = Object.keys(grouped).map((k)=> {
      const count = utils.sum(grouped[k]);
      return {value: `${k}-(${count})`, count: count};
    });
    return take(result, 30);
  }
  render() {
    const {ordersFetch} = this.props;
    if(ordersFetch.fulfilled) {
      return (
        <TagCloud minSize={15}
          maxSize={40}
          tags={this.getMostPopular(ordersFetch.value)}
          onClick={(tag) => {
            this.props.onClick(tag)
          }} />
        );
      } else {
        return <div>Loading...</div>
      }
    }
};

export default connect(props => ({
  ordersFetch: {url: `/api/mock_orders.json`, comparison:`${props.filter}:${props.filter2}`}
}))(Tags)
