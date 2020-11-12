import React, { useContext } from 'react'

import FlipContext from '../../../context/FlipContext';

// import '../../../style/reusables.scss';

// Component imports
import AddFlipForm from '../../AddFlipForm/AddFlipForm';
import FlipContainer from '../../FlipContainer/FlipContainer';

function ActiveFlips() {
  const { flips, crudFunctions } = useContext(FlipContext);

  const activeFlips = flips.filter(flip => !flip.isComplete);

  return (
    <main className="main">
      <AddFlipForm addFlip={crudFunctions.addFlip} />
      <FlipContainer
        crudFunctions={crudFunctions}
        displayFlips={activeFlips}
        flipCount={activeFlips.length}
        title="Active flips"
      />
    </main>       
  )
}

export default ActiveFlips;