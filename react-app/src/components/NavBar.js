import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import EatlpLogo from '../Picture/EatlpLogo.png';
import "./NavBar.css";
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from './auth/LoginFormModal';
import EatlpLogo1 from '../Picture/logo1.png';


const NavBar = ({ isLoaded }) => {

  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)
  const profile = useSelector(state => state.profile.profile)
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='Navbar_Container'>

      <div className='Eatlp'>
        <div>
          <NavLink className="Eatlp_link" to='/' exact={true} activeClassName='active'>
            Eatlp
        <img className="Logo_image" src={EatlpLogo1} />
          </NavLink>
        </div>
      </div >

      <div className='Login_SignUp_Container'>

        {sessionUser && (
          <div >
            <div className='Navbar_test'>
              <div>
                <NavLink className="Navbar_link_GetAllBiz" to='/businesses' exact={true} activeClassName='active'>
                All Restaurants
                </NavLink>

                <NavLink className="Navbar_link_CreateBiz" to='/businesses/new' exact={true} activeClassName='active'>
                  Create Restaurant
                </NavLink>
              </div>
              <div className='Click_Me'>
                {/* <i className="fa-solid fa-list"/> <i className="fas fa-user-circle"/> */}
                <img className='profile_image' src={profile? profile?.profile_img : sessionUser.profile_img} />
                <div className='login_already'>
                  <ProfileButton user={sessionUser} setShowModal={setShowModal} showModal={showModal} />
                </div>
              </div>


            </div>

          </div>

        )}


        {!sessionUser && <div className='login'>
          <NavLink className="Navbar_link_login" to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
          {/* <div> 
          <button className="button" onClick={() => setShowModal(true)}>click me</button>
            <LoginFormModal setShowModal={setShowModal} showModal={showModal} />   
            </div> */}
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
