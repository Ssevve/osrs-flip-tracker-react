import React from 'react'

import './FlipContainer.scss';

// Component imports
import Flip from '../Flip/Flip';

function FlipContainer({crudFunctions, flips, title}) {
  return (
    <section className="flips">
      <h2 className="section-title">{title} ({flips.length})</h2>
      <ul className="flips__list">
        {
          flips.map((flip) => {
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