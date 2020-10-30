import React from 'react'

import './Tracker.scss';

// Component imports
import AddFlipForm from '../AddFlipForm/AddFlipForm';
import ActiveFlips from '../ActiveFlips/ActiveFlips';

function Tracker({ addFlip, deleteFlip, editFlip, refreshFlip, setCompleteFlip, flips }) {

  return (
    <main className="tracker">
      <AddFlipForm addFlip={addFlip} />
      <ActiveFlips  
        deleteFlip={deleteFlip}
        editFlip={editFlip}
        refreshFlip={refreshFlip}
        setCompleteFlip={setCompleteFlip}
        flips={flips} 
      />
    </main>       
  )
}

export default Tracker;