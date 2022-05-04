import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {Error404} from '../../features/error/Error';
import {Login} from '../../features/auth/login/Login';
import {PasswordNew} from '../../features/auth/password-new/PasswordNew';
import {PasswordReset} from '../../features/auth/password-reset/PasswordReset';
import {Profile} from '../../features/profile/Profile';
import {Register} from '../../features/auth/register/Register';
import {Test} from '../../features/test/Test';

export const path = {
    login: '/login',
    signup: '/signup',
    profile: '/profile',
    passwordReset: '/password_reset',
    passwordNew: '/password_new',
    test: '/test'
}

export const Pages = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Navigate to={path.test}/>}/>
                <Route path={path.test} element={<Test/>}/>
                <Route path={path.login} element={<Login/>}/>
                <Route path={path.signup} element={<Register/>}/>
                <Route path={path.profile} element={<Profile/>}/>
                <Route path={path.passwordReset} element={<PasswordReset/>}/>
                <Route path={path.passwordNew} element={<PasswordNew/>}/>
                <Route path={'/*'} element={<Error404/>}/>
            </Routes>
        </div>
    );
};

export default Pages;