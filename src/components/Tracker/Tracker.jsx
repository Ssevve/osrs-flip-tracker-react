import React from 'react'
import './Tracker.scss';

// Component imports
import NewFlipForm from '../NewFlipForm/NewFlipForm';

function Tracker() {
  return (
    <main className="tracker">
      <NewFlipForm />
      {/* <Flips /> */}
    </main>       
  )
}

export default Tracker;