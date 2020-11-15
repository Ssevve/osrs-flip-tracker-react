import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import FlipContext from '../../../context/FlipContext';

// import '../../../style/reusables.scss';

// Component imports
import AddFlipForm from '../../AddFlipForm/AddFlipForm';
import FlipContainer from '../../FlipContainer/FlipContainer';

function ActiveFlips() {
  const [userData, setUserData] = useState({});

  const { flips, crudFunctions } = useContext(FlipContext);

  const history = useHistory();

  useEffect(() => {
    const API_URL = 'http://localhost:5000/';
    fetch(API_URL, {
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      }
    }).then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.user) {
          setUserData(result.user);
        } else {
          localStorage.removeItem('token');
          history.push('/login');
        }
      })
  }, []);

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