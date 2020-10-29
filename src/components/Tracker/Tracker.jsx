import React, { useState } from 'react'

import './Tracker.scss';

// Component imports
import NewFlipForm from '../NewFlipForm/NewFlipForm';
import ActiveFlips from '../ActiveFlips/ActiveFlips';

function Tracker() {
  const [activeFlips, setActiveFlips] = useState([]);

  return (
    <main className="tracker">
      <NewFlipForm setActiveFlips={setActiveFlips} />
      <ActiveFlips activeFlips={activeFlips} />
    </main>       
  )
}

export default Tracker;