import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import Joi from 'joi';

// Component imports
import AlertBox from '../../../components/AlertBox/AlertBox';

function Login() {
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  })

  const history = useHistory();

  const handleChange = (e) => {
    setError('');
    setUserData({...userData, [e.target.name]: e.target.value});
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

      const LOGIN_URL = 'http://localhost:5000/users/login';
      const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
        },
      };

      const res = await fetch(LOGIN_URL, options);
      if (res.ok) {
        // Loggin in successful
        const resJson = await res.json();
        localStorage.token = resJson.token;
        console.log('logged in');

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
      password: Joi.string().min(8).trim().required()
    });

    const result = schema.validate(userData);
    if(!result.error){
      return true;
    }

    setError('Unable to login.'); 
    return false;
  };

  return (
    <main className="main">
      <form className="form login-form" onSubmit={handleSubmit}>
        <h2 className="form__title">Login</h2>
        { error &&
          <AlertBox message={error} type="error" />
        }
        <div className="form__group login-form__group">
          <label className="form__label">
            Username
            <input 
              className='form__input'
              type="text"
              name="username"
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form__group login-form__group">
          <label className="form__label">
            Password
            <input 
              className='form__input'
              type="password"
              name="password"
              onChange={handleChange}
            />
          </label>
        </div>

        <input className="btn form__submit login-form__submit" type="submit" value="Login" />
      </form>
    </main>
  );
};

export default Login;
