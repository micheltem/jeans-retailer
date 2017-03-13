import React, { PropTypes } from 'react';

import './user-icon.css'

const UserIcon = ({ userName }) => {

  // render the initial of the userName or ?
  const getInitial = () => {
    return userName[0] || '!';
  }

  return (
    <div className="user-avatar float-right">
      <span href="#">{ getInitial() }</span>
    </div>
  );
}

UserIcon.propTypes = {
  userName: PropTypes.string
}

UserIcon.defaultProps = {
  userName: '?'
}

export default UserIcon;
