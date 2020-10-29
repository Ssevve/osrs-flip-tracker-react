import React from 'react'

import './Tracker.scss';

// Component imports
import NewFlipForm from '../NewFlipForm/NewFlipForm';
import ActiveFlips from '../ActiveFlips/ActiveFlips';

function Tracker({ addFlip, deleteFlip, refreshFlip, setCompleteFlip, flips }) {

  return (
    <main className="tracker">
      <NewFlipForm addFlip={addFlip} />
      <ActiveFlips  
        deleteFlip={deleteFlip}
        refreshFlip={refreshFlip}
        setCompleteFlip={setCompleteFlip}
        flips={flips} 
      />
    </main>       
  )
}

export default Tracker;