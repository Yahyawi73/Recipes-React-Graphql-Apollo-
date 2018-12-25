import React from 'react';
import { NavLink } from 'react-router-dom';
import SignOut from './Auth/SignOut';

const NavBar = ({ session }) => (
    <nav>
        {session && session.getCurrentUSer ? <NavBarAuth session={session} /> : <NavBarUnAuth />}
    </nav>
);

const NavBarAuth = ({ session }) => (
    <ul className="nav-bar">
        <li>
            <NavLink to='/' exact>Home</NavLink>
        </li>
        <li>
            <NavLink to='/search' exact>search</NavLink>
        </li>
        <li>
            <NavLink to='/recipe/add' exact>Add Recipe</NavLink>
        </li>
        <li>
            <NavLink to='/profile' exact>profile</NavLink>
        </li>
        <li className="user-title">
            Welcome, <strong>{session.getCurrentUSer.userName}</strong>
        </li>
        <li>
            <SignOut />
        </li>
    </ul>
)

const NavBarUnAuth = () => (
    <ul className="nav-bar">
        <li>
            <NavLink to='/' exact>Home</NavLink>
        </li>
        <li>
            <NavLink to='/search' exact>search</NavLink>
        </li>
        <li>
            <NavLink to='/signin' exact>SignIn</NavLink>
        </li>
        <li>
            <NavLink to='/signup' exact>SignUp</NavLink>
        </li>
    </ul>
);

export default NavBar;