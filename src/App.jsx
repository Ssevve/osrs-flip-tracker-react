import React, { useState } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

// Components imports
import Header from './components/Header/Header';
import ActiveFlips from './components/pages/ActiveFlips/ActiveFlips';
import History from './components/pages/History/History';

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

  const editFlip = (id, edit) => {
    const updatedFlips = flips.map((flip) => {
      if(flip.id === id) {
        flip = {...flip, ...edit};
      }
      return flip;
    });
    setFlips(updatedFlips);
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

  const deleteFlip = (id) => {
    setFlips(flips.filter((flip) => flip.id !== id));
  }

  const crudFunctions = {
    addFlip,
    setCompleteFlip,
    editFlip,
    refreshFlip,
    deleteFlip,
  }

  return (
    <Router>
      <div className="app">
        <Header />
        <Route 
          exact path="/" 
          render={() => <ActiveFlips crudFunctions={crudFunctions} flips={flips} />} 
        />
        <Route path="/history" render={() => <History crudFunctions={crudFunctions} flips={flips} />} /> 
      </div>
    </Router>
  );
}

export default App;
