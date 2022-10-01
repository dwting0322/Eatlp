import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import EatlpLogo from '../Picture/EatlpLogo.png';
import "./NavBar.css";
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';



const NavBar = ({ isLoaded }) => {

  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)

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

        {sessionUser && (
          <div >
            <div className='Navbar_test'>
              <div>
                <NavLink className="Navbar_link_GetAllBiz" to='/businesses/all' exact={true} activeClassName='active'>
                  Find All Restaurant
                </NavLink>

                <NavLink className="Navbar_link_CreateBiz" to='/businesses' exact={true} activeClassName='active'>
                  Create Business
                </NavLink>
              </div>
              <div className='Click_Me'>
                {/* <i className="fa-solid fa-list"/> <i className="fas fa-user-circle"/> */}
                <img className='profile_image' src={sessionUser.profile_img} />
                <div className='login_already'>
                  <ProfileButton user={sessionUser} />
                </div>
              </div>


            </div>

          </div>

        )}


        {!sessionUser && <div className='login'>
          <NavLink className="Navbar_link_login" to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>

          <NavLink className="Navbar_link_signuip" to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div>}
        {/* <div>
          <LogoutButton />
        </div> */}
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
