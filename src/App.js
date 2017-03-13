import React, { Component } from 'react';
import './App.css';
import Navbar from './Header/Navbar/Navbar';
import DataViewerData from './DataViewer/DataViewerData';

class App extends Component {
  render () {
    const { filter } = this.props.params  || {};
    return (
      <section className="app">
        <Navbar />
        <section className="header">
          Your data
        </section>
        <section className="content">
            <DataViewerData filter={filter} />
        </section>
      </section>
    );
  }
}

export default App;
