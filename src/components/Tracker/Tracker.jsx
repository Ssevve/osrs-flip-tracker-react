import React from 'react'

import './Tracker.scss';

// Component imports
import AddFlipForm from '../AddFlipForm/AddFlipForm';
import ActiveFlipsContainer from '../ActiveFlipsContainer/ActiveFlipsContainer';

function Tracker({ addFlip, deleteFlip, editFlip, refreshFlip, setCompleteFlip, flips }) {

  return (
    <main className="tracker">
      <AddFlipForm addFlip={addFlip} />
      <ActiveFlipsContainer  
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