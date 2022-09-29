
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import EatlpLogo from '../Picture/EatlpLogo.png';
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className='Navbar_Container'>
     
        <div className='Eatlp'>
          <div><img className="Logo_image" src={EatlpLogo} /></div>
          <div>
          <NavLink className="Eatlp_link" to='/' exact={true} activeClassName='active'>
            Eatlp
          </NavLink>
          </div>
        </div >
      
      <div className='Login_SignUp_Container'>
        <div className='FindAllPlace'>
          <NavLink className="Navbar_link" to='/businesses/all' exact={true} activeClassName='active'>
            Find All Restaurant
          </NavLink>
        </div>
        <div>
          <NavLink className="Navbar_link" to='/businesses' exact={true} activeClassName='active'>
            Create Business
          </NavLink>
          </div>
        <div className='login'>
          <NavLink className="Navbar_link" to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </div>
        <div>
          <NavLink className="Navbar_link" to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div>
      <div>
        <LogoutButton />
      </div>
      </div>
      {/* <div>
        <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink>
      </div> */}
    </div>
  );
}

export default NavBar;
