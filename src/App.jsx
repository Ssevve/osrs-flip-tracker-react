import React, { useState } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

// Components imports
import Header from './components/Header/Header';
import ActiveFlips from './components/pages/ActiveFlips/ActiveFlips';
import History from './components/pages/History/History';

function App() {
  const [flips, setFlips] = useState([
    {
      itemName: 'item1',
      buyPrice: '255',
      quantity: '10',
      sellPrice: '256',
      isComplete: true,
      createdAt: 1604319660803,
      id: 1,
    },
    {
      itemName: 'item2',
      buyPrice: '40',
      quantity: '10',
      sellPrice: '45',
      isComplete: true,
      createdAt: 1604319660803,
      id: 2
    },
    {
      itemName: 'item3',
      buyPrice: '44',
      quantity: '101',
      sellPrice: '54',
      isComplete: true,
      createdAt: 1604319660803,
      id: 3
    },
    {
      itemName: 'item4',
      buyPrice: '50',
      quantity: '110',
      sellPrice: '69',
      isComplete: true,
      createdAt: 1604319660803,
      id: 454
    },
    {
      itemName: 'item5',
      buyPrice: '40',
      quantity: '10',
      sellPrice: '45',
      isComplete: true,
      createdAt: 1604319660803,
      id: 5546
    },
    {
      itemName: 'item6',
      buyPrice: '40',
      quantity: '10',
      sellPrice: '45',
      isComplete: true,
      createdAt: 1604319660803,
      id: 6546
    },
    {
      itemName: 'item7',
      buyPrice: '40',
      quantity: '10',
      sellPrice: '45',
      isComplete: true,
      createdAt: 1604319660803,
      id: 7654
    },
    {
      itemName: 'item8',
      buyPrice: '40',
      quantity: '10',
      sellPrice: '45',
      isComplete: true,
      createdAt: 1604319660803,
      id: 8345
    },
    {
      itemName: 'item9',
      buyPrice: '40',
      quantity: '10',
      sellPrice: '45',
      isComplete: true,
      createdAt: 1604319660803,
      id: 9765
    },
    {
      itemName: 'item10',
      buyPrice: '40',
      quantity: '10',
      sellPrice: '45',
      isComplete: true,
      createdAt: 1604319660803,
      id: 10345
    },
    
  ]);

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
