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
import {CheckEmail} from "../../features/auth/password-reset/CheckEmail/CheckEmail";
import RequireAuth from "../../common/RequireAuth/RequireAuth";
import PacksList from "../../table-pack/PacksList";
import PackName from "../../table-cards/PackName";

export const path = {
    login: '/login',
    signup: '/signup',
    profile: '/profile',
    passwordReset: '/password_reset',
    passwordNew: '/password_new',
    test: '/test',
    checkEmail: '/check_email',
    packsList: '/packs_list',
    packName:'/pack_name'
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
                <Route path={path.profile} element={<RequireAuth>
                    <Profile/>
                </RequireAuth>}/>
                <Route path={path.passwordReset} element={<PasswordReset/>}/>
                <Route path={`${path.passwordNew}/:token`} element={<PasswordNew/>}/>
                <Route path={path.checkEmail} element={<CheckEmail/>}/>
                <Route path={path.packsList} element={<RequireAuth>
                    <PacksList/>
                </RequireAuth>}/>
                <Route path={`${path.packName}/:id`} element={<RequireAuth>
                    <PackName/>
                </RequireAuth>}/>
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