import React from 'react'

import './ActiveFlips.scss';

// Component imports
import AddFlipForm from '../../AddFlipForm/AddFlipForm';
import FlipContainer from '../../FlipContainer/FlipContainer';

function ActiveFlips({ crudFunctions, flips }) {

  const activeFlips = flips.filter(flip => !flip.isComplete);

  return (
    <main className="active-flips">
      <AddFlipForm addFlip={crudFunctions.addFlip} />
      <FlipContainer
        crudFunctions={crudFunctions}
        flips={activeFlips}
        title="Active flips"
      />
    </main>       
  )
}

export default ActiveFlips;