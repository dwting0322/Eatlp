import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import "./LoginForm.css"


const LoginForm = ({ showModal, setShowModal }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (errors.length > 0) {
      return alert("Cannot Submit");
    }
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    // if (data) setShowModal(false) this is for login modal
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };


  useEffect(() => {
    let errs = [];

    if (!email.includes("@")) {
      errs.push("   Please provide a valid Email");
    }

    if (password.length <= 5) {
      errs.push("Password length must be greater than 5");
    }

    setErrors(errs);
  }, [email, password]);




  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className="center_form" onSubmit={onLogin}>

      <div className='login_form_outter_container'>

        <div className='login_form_container'>
          <h2 className='Eatlp_word'> Log in to Eatlp</h2>
          <p className='new'>New to Eatlp?
            <NavLink className="signuip_login_page" to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </p>
          <div className='errors'>
            {hasSubmitted &&
              errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
          </div>
          <div>
            <label htmlFor='email'></label>
            <input className="login_input"
              name='email'
              type='text'
              required
              placeholder='Email...'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label htmlFor='password'></label>
            <input className="login_input"
              name='password'
              type='password'
              required
              placeholder='Password...'
              value={password}
              onChange={updatePassword}
            />
            {/* <button type='submit'>Login {" "}</button>
          <button
            className="login_button"
            type="submit"
            onClick={() => {
              setEmail("demo@aa.io");
              setPassword("password");
            }}
          >
            {" "}
            Demo User{" "}
          </button> */}
          </div>
          <div><button className="login_button" type='submit'>Login {" "}</button></div>
          <div>
            <button
              className="login_button"
              type="submit"
              onClick={() => {
                setEmail("demo@aa.io");
                setPassword("password");
              }}
            >
              {" "}
              Demo User{" "}
            </button>
          </div>
        </div>

        <div><img className='picture' src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png" /></div>
      </div>
    </form>
  );
};

export default LoginForm;
