import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import sinon from 'sinon';
import { expect } from 'chai';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Navbar />, div);
});
