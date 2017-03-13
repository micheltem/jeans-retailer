import React, { Component } from 'react';
import './App.css';
import Navbar from './Header/Navbar/Navbar';
import DataViewerData from './DataViewer/DataViewerData';

class App extends Component {
  render () {
    const { filter, filter2 } = this.props.params  || {};
    return (
      <section className="app">
        <Navbar />
        <section className="header">
          Your data
        </section>
        <section className="content">
            <DataViewerData filter={filter} filter2={filter2} />
        </section>
      </section>
    );
  }
}

export default App;
