import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {Error404} from '../../features/error/Error';
import {Login} from '../../features/auth/login/Login';
import {PasswordNew} from '../../features/auth/password-new/PasswordNew';
import {PasswordReset} from '../../features/auth/password-reset/PasswordReset';
import {Profile} from '../../features/profile/Profile';
import {Register} from '../../features/auth/register/Register';
import {Test} from '../../features/test/Test';
import {useAppDispatch, useAppSelector} from "../../../hooks/useReactRedux";
import loading from '../../assets/image/loader.gif';
import s from './Pages.module.scss'
import PopUpWindowRegistration from "../../components/PopUpWindow/PopUpWindowRegistration/PopUpWindowRegistration";
import {saveErrorApp} from "../../../app/app-reducer";

export const path = {
    login: '/login',
    signup: '/signup',
    profile: '/profile',
    passwordReset: '/password_reset',
    passwordNew: '/password_new',
    test: '/test'
}

export const Pages = () => {
    //react-redux
    const dispatch = useAppDispatch()
    const isLoadingApp: boolean = useAppSelector(state => state.cardsApp.isLoading)
    const errorApp: string | null = useAppSelector(state => state.cardsApp.error)

    //callbacks
    const closeErrorApp = () => {
        dispatch(saveErrorApp(null))
    }

    return (
        <div className={s.pagesBlock}>
            <div className={s.loading}>
                {isLoadingApp && <img src={loading} height='100px' width='100px'/>}
            </div>
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
            <div className={s.popUpContainer}>
                {errorApp &&
                    <PopUpWindowRegistration value={errorApp} callback={closeErrorApp} className={s.popUp}
                                             header='Error'/>}
            </div>
        </div>
    )
};

export default Pages;