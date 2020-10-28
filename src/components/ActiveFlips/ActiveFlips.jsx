import React from 'react'

import './ActiveFlips.scss';

// Component imports
import Flip from '../Flip/Flip';

function ActiveFlips() {
  return (
    <section className="active-flips">
      <h2 className="section-title">Active flips (3)</h2>
      <ul className="active-flips__list">
        <Flip />
      </ul>
    </section>       
  )
}

export default ActiveFlips;