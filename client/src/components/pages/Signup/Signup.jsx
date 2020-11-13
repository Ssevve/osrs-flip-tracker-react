import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Joi from 'joi';

// Component imports
import AlertBox from '../../AlertBox/AlertBox';

function Signup() {
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    passwordCheck: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    setError('');
    setUserData({...userData, [e.target.name]: e.target.value});
  };

  const formatError = (error) => {
    const words = error.split(' ');
    words[0] = words[0].replace(/\"/g, '');
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    const formattedError = words.join(' ');
    return formattedError + '.';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

		setError('');
    if (isValidUser()) {
      // Send data to server
      const body = {
        username: userData.username,
        password: userData.password,
      };

      const SIGNUP_URL = 'http://localhost:5000/users/signup';
      const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
      };

      const res = await fetch(SIGNUP_URL, options);
      if (res.ok) {
        // Account creation successful
        const createdUserData = await res.json();
        console.log(createdUserData);
        console.log('Account creation successful. Redirecting to login page.');
        history.push('/login');

      // Handle errors
      } else if (res.status === 500) {
        const error = await res.json();
        console.log(error);
        setError('Server error occurred. Please try again.'); 
      } else {
        const error = await res.json();
        setError(error.message);
      }
    }
  };

  const isValidUser = () => {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(4).max(30).trim().required(),
      password: Joi.string().min(8).trim().required(),
      passwordCheck: Joi.ref('password'),
    });

    const result = schema.validate(userData);
    if(!result.error){
      return true;
    }

    if (result.error.message.includes('passwordCheck')) {
      setError('Passwords do not match.');
    } else {
      setError(formatError(result.error.message));
    }
    return false;
  };


  return (
    <main className="main">
      <form className="form signup-form" onSubmit={handleSubmit}>
        <h2 className="form__title">Signup</h2>
        { error &&
          <AlertBox message={error} type="error" />
        }
        <div className="form__group signup-form__group">
          <label className="form__label">
            Username
            <span className="required-asterisk"> *</span>
            <input 
              className='form__input'
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form__group signup-form__group">
          <label className="form__label">
            Password
            <span className="required-asterisk"> *</span>
            <input 
              className='form__input'
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form__group signup-form__group">
          <label className="form__label">
            Verify password
            <span className="required-asterisk"> *</span>
            <input 
              className='form__input'
              type="password"
              name="passwordCheck"
              value={userData.passwordCheck}
              onChange={handleChange}
            />
          </label>
        </div>
        <input className="btn form__submit signup-form__submit" type="submit" value="Signup" />
      </form>
    </main>
  );
};

export default Signup;
