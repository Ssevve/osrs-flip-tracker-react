import React from 'react'

import './ActiveFlips.scss';

// Component imports
import Flip from '../Flip/Flip';

function ActiveFlips(props) {
  return (
    <section className="active-flips">
      <h2 className="section-title">Active flips ({props.flips.filter(flip => !flip.completed).length})</h2>
      <ul className="active-flips__list">
        {
          props.flips.map((flip) => {
            if (!flip.completed) {
              return <Flip key={flip.id} flip={flip} />
            }
          })
        }
      </ul>
    </section>       
  )
}

export default ActiveFlips;