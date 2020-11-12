import React, { useState } from 'react';
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

  const handleChange = (e) => {
    setError('');
    setUserData({...userData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidUser()) {
      console.log('Valid');
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
      setError('Passwords do not match.')
    } else {
      setError(formatError(result.error.message));
    }
    return false;
  };

  const formatError = (error) => {
    const words = error.split(' ');
    words[0] = words[0].replace(/\"/g, '');
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    const formattedError = words.join(' ');
    return formattedError + '.';
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
