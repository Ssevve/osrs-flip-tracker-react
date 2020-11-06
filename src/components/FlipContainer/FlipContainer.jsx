import React from 'react'

import './FlipContainer.scss';

// Component imports
import Flip from '../Flip/Flip';

function FlipContainer({crudFunctions, flipCount, displayFlips, title }) {
  return (
    <section className="flips">
      <h2 className="section-title">{title} ({flipCount})</h2>
      <ul className="flips__list">
        {
          displayFlips.map((flip) => {
            return (
              <Flip
                key={flip.id}
                flip={flip}
                crudFunctions={crudFunctions}
              />
            )
          })
        }
      </ul>
    </section>       
  )
}

export default FlipContainer;