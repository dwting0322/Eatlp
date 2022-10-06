import React from 'react'
import { NavLink} from 'react-router-dom';
import notFound from '../Picture/404-error-page-not-found.jpg'
import './NotFound.css'

function NotFound() {
  return (
    <div>
        <div className='notfound_container'>
            <h1 className='notFound'>404 Page Not Found</h1>
            <h2 className='link_404'>
                <NavLink className='link_404' to='/'>Return to the homepage</NavLink>
            </h2>
        </div>

        <div className=''>
            <img className='image_not_found' src={notFound} alt='404 Not Found'/>
        </div>
    </div>

)
}

export default NotFound
