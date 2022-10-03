import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./SignUpForm.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  // const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (errors.length > 0) {
      return alert("Cannot Submit");
    }
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  // const updateUsername = (e) => {
  //   setUsername(e.target.value);
  // };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const updateLastName = (e) => {
    setLastName(e.target.value);
  };
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };


  useEffect(() => {
    let errs = [];


    if (!email.includes("@")) {
      errs.push("Please provide a valid Email");
    }

    if (firstName.length > 16) {
      errs.push("FirstName must between 1 to 16");
    }

    if (firstName.includes(".")) {
      errs.push("FirstName can't be period");
    }


    if (lastName.length > 16) {
      errs.push("LastName must between 1 to 16");
    }

    if (lastName.includes(".")) {
      errs.push("LastName can't be period");
    }

    if (password.length <= 5) {
      errs.push("Password length must be greater than 5");
    }

    if (password !== repeatPassword)
      errs.push("Password and Confirm password does not match");


    setErrors(errs);
  }, [email, firstName, lastName, password, repeatPassword]);



  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup_container'>

      <form className='signup_Form_container' onSubmit={onSignUp}>
        {/* <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div> */}
      <h2 className='Sign_Up_word'> Sign Up for Eatlp</h2>
      <p className='Sign_Up_Connect_word'>Connect with great local businesses</p>
        <div className='errors'>
          {hasSubmitted &&
            errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
        </div>
        <div>
          <label></label>
          <input className="login_input"
            type='text'
            name='firstName'
            placeholder='FirstName...'
            onChange={updateFirstName}
            required
            value={firstName}
          ></input>
        </div>
        <div>
          <label></label>
          <input className="login_input"
            type='text'
            name='lastName'
            placeholder='LastName...'
            onChange={updateLastName}
            required
            value={lastName}
          ></input>
        </div>
        <div>
          <label></label>
          <input className="login_input"
            type='text'
            name='email'
            placeholder='Email...'
            onChange={updateEmail}
            required
            value={email}
          ></input>
        </div>
        <div>
          <label></label>
          <input className="login_input"
            type='password'
            name='password'
            placeholder='Password...'
            onChange={updatePassword}
            required
            value={password}
          ></input>
        </div>
        <div>
          <label></label>
          <input className="login_input"
            type='password'
            name='repeat_password'
            placeholder='Repeat Password...'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button className="login_button" type='submit'>Sign Up</button>
        <div className='signup_Already_word'>Already on Yelp?
        <NavLink className="signup_login_link" to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </div>
      </form>

      <div><img className='signup_picture' src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png" /></div>
    
    </div>
  );
};

export default SignUpForm;
