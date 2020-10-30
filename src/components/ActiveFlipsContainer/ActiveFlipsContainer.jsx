import React from 'react'

import './ActiveFlipsContainer.scss';

// Component imports
import Flip from '../Flip/Flip';

function ActiveFlipsContainer({ deleteFlip, editFlip, refreshFlip, setCompleteFlip, flips }) {
  const activeFlips = flips.filter(flip => !flip.isComplete);
  return (
    <section className="active-flips">
      <h2 className="section-title">Active flips ({activeFlips.length})</h2>
      <ul className="active-flips__list">
        {
          activeFlips.map((flip) => {
            return (
              <Flip
                key={flip.id}
                flip={flip}
                deleteFlip={deleteFlip}
                editFlip={editFlip}
                refreshFlip={refreshFlip}
                setCompleteFlip={setCompleteFlip}
              />
            )
          })
        }
      </ul>
    </section>       
  )
}

export default ActiveFlipsContainer;