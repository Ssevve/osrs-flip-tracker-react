import React, { useState } from 'react'

import './Tracker.scss';

// Component imports
import NewFlipForm from '../NewFlipForm/NewFlipForm';
import ActiveFlips from '../ActiveFlips/ActiveFlips';

function Tracker() {
  const [flips, setFlips] = useState([]);
  // const [activeFlips, setActiveFlips] = useState([]);
  // const [completedFlips, setCompletedFlips] = useState([]);

  return (
    <main className="tracker">
      <NewFlipForm setFlips={setFlips} />
      <ActiveFlips flips={flips} />
    </main>       
  )
}

export default Tracker;