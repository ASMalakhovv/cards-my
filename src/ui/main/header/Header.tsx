import React from 'react';
import {NavLink} from 'react-router-dom';
import {path} from '../routes/Pages';
import s from './Header.module.scss'
import {useAppSelector} from "../../../hooks/useReactRedux";
import Logout from "../../components/Logout/Logout";

const Header = () => {
    //hooks


    //react-redux
    const profileID = useAppSelector(state => state.profile._id)

    //class definition
    const activeClass = (isActive: boolean): Object => {
        if (isActive) {
            return {color: '#dc6562'}
        }
        return {}
    }

    //callbacks


    return (
        <div className={s.navLinks}>

            <NavLink to={path.profile} style={({isActive}) => activeClass(isActive)}>PROFILE</NavLink>
            <NavLink to={path.login} style={({isActive}) => activeClass(isActive)}>LOGIN</NavLink>
            <NavLink to={path.signup} style={({isActive}) => activeClass(isActive)}>REGISTRATION</NavLink>
            <NavLink to={path.passwordReset} style={({isActive}) => activeClass(isActive)}>PASSWORD RECOVERY</NavLink>
            <NavLink to={path.passwordNew} style={({isActive}) => activeClass(isActive)}>NEW PASSWORD</NavLink>
            <NavLink to={path.test} style={({isActive}) => activeClass(isActive)}>TEST</NavLink>

            {profileID && <Logout/>}

        </div>
    );
};

export default Header;