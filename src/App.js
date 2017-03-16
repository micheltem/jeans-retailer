import React, { Component } from 'react';
import './App.css';
import Navbar from './Header/Navbar/Navbar';
import DataViewerData from './DataViewer/DataViewerData';
import TagCloud from './TagCloud/TagCloud';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideTags: false
    }
  }
  hideTags(hide, $event) {
    $event.stopPropagation();
    this.setState({hideTags: hide})
  }
  clickTag (tag) {
    alert(`'${tag.value}' was ordered ${tag.count} times!`)
  }
  render () {
    const { filter, filter2 } = this.props.params  || {};
    return (
      <section className="app">
        <Navbar />
        {this.state.hideTags &&
          <a className="show"
            onClick={($event)=> this.hideTags(false, $event)}>Show Tags...</a>
        }
        {!this.state.hideTags &&
          <section className="header">
            <a className="hide"
              onClick={($event)=> this.hideTags(true, $event)}>Hide Tags...</a>
            <TagCloud
              filter={filter}
              filter2={filter2}
              onClick={this.clickTag.bind(this)} />
          </section>
        }
        <section className="content">
          <DataViewerData
            filter={filter}
            filter2={filter2} />
        </section>
      </section>
    );
  }
}

export default App;
