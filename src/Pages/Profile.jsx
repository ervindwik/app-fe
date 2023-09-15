import React from 'react';
import {NavbarLogin, NavbarDefault} from '../Components/Navbar';
import Header from '../Components/ProfileComp/Header';
import Line from '../Components/ProfileComp/Line';
const Profile = () => {
    return (
        <div>
            <NavbarLogin />
            <Header />
            <Line />
        </div>

    )
}

export default Profile