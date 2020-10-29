import React, { useState } from 'react';

// Components imports
import Header from './components/Header/Header';
import Tracker from './components/Tracker/Tracker';

function App() {
  const [flips, setFlips] = useState([]);

  const addFlip = (newFlip) => {
    setFlips([...flips, newFlip]);
  }

  const setCompleteFlip = (id) => {
    const updatedFlips = flips.map((flip) => {
      if (flip.id === id) {
        flip.isComplete = true;
      }
      return flip;
    })
    setFlips(updatedFlips);
  }

  const deleteFlip = (id) => {
    setFlips(flips.filter((flip) => flip.id !== id));
  }

  const refreshFlip = (id) => {
    const updatedFlips = flips.map((flip) => {
      if (flip.id === id) {
        flip.createdAt = Date.now();
      }
      return flip;
    })
    setFlips(updatedFlips);
  }

  return (
    <div className="app">
      <Header />
      <Tracker 
        addFlip={addFlip} 
        deleteFlip={deleteFlip}
        refreshFlip={refreshFlip}
        setCompleteFlip={setCompleteFlip} 
        flips={flips} 
      />
    </div>
  );
}

export default App;
