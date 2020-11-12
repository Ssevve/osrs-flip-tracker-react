import React, {useState} from 'react';

function Login() {
  const [error, setError] = useState('');
  return (
    <main className="main">
      <form className="form login-form">
        <h2 className="form__title">Login</h2>
        <div className="form__group login-form__group">
          <label className="form__label">
            Username
            <input 
              className='form__input'
              type="text"
              name="username"
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
            />
          </label>
        </div>

        <input className="btn form__submit login-form__submit" type="submit" value="Login" />
      </form>
    </main>
  );
};

export default Login;
