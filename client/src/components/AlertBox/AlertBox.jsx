import React from 'react';

import './AlertBox.scss';

function AlertBox({ message, type }) {
  return (
    <div className={type ? `alert-box ${type}` : 'alert-box'}>
      <p className="alert-box__message">{message}</p>
    </div>
  );
};

export default AlertBox;
