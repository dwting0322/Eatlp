import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { logout } from "../store/session";
import "./NavBar.css";

function ProfileButton({ user, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const onLogout = async (e) => {
        e.preventDefault();
        await dispatch(logout());
        history.push("/");
        // setShowModal(false) this is for close modal after logout
    };

    return (
        <>
            <div className="">
                <div className='profile_name_email'>
                    <i className="fa-solid fa-user" /> Hi, {user.first_name}

                </div >
                <hr></hr>
                <div className='profile_name_email'>
                    <i className="fa-solid fa-envelope" /> {user.email}

                </div>
                <hr></hr>
                <div className="logout_dropdown" onClick={onLogout}>
                <i className="fa-solid fa-right-from-bracket"/> Log Out
                    
                </div>
            </div>
        </>
    );
}

export default ProfileButton;