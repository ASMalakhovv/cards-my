import s from './Login.module.scss'
import {ProgressBar} from "../../../components/ProgressBar/ProgressBar";
import {useAppDispatch, useAppSelector} from "../../../../hooks/useReactRedux";
import PopUpWindowRegistration from "../../../components/PopUpWindow/PopUpWindowRegistration/PopUpWindowRegistration";
import React, {ChangeEvent, useCallback, useState} from "react";
import {setErrorLogin} from "./login-reducer";
import eye from "../../../assets/image/eye.png";
import {Link} from "react-router-dom";
import SuperButton from "../../../common/SuperButton/SuperButton";
import { path } from '../../../main/routes/Pages';


export const Login = React.memo(() => {
    //хуки
    const [valueEmail, setValueEmail] = useState("")
    const [valuePassword, setValuePassword] = useState("")
    const [type, setType] = useState("password")

    //реакт-редакс
    const isLoading: boolean = useAppSelector(state => state.login.isLoading)
    const error: null | string = useAppSelector(state => state.login.error)
    const dispatch = useAppDispatch()

    //вычисляем стили
    const classNameInput = error ? `${s.error}` : ''
    const classNameLink = error ? `${s.disabledLink}` : ''

    //callbacks
    const closePopUpWindow = useCallback(() => {
        error && dispatch(setErrorLogin(null))
    }, [error])
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.dataset.input) {
            const type: string = e.currentTarget.dataset.input
            if (type === 'email') {
                setValueEmail(e.currentTarget.value)
            } else if (type === 'onePassword') {
                setValuePassword(e.currentTarget.value)
            }
        }
    }
    const changeTypeForInput = () => {
        const computedType = type === 'text' ? 'password' : 'text'
        setType(computedType)
    }
    const sendLoginData = useCallback(() => {
        /* if (testValidation) {
             dispatch(registration(valueEmail, valueOnePassword))
         } else {
             dispatch(setErrorRegistration(errorValidation))
         }*/
    }, [valueEmail/*, valueOnePassword, testValidation, errorValidation*/])


    return (
        <div className={s.loginBlock}>
            <div className={s.loginContainer}>
                <div className={s.progressBar}>
                    {isLoading && <ProgressBar/>}
                </div>

                <header className={s.header}>
                    <h1>it-incubator</h1>
                    <h2>Sign In</h2>
                    <span></span>
                </header>

                <div className={s.popUp}>
                    {error && <PopUpWindowRegistration value={error} callback={closePopUpWindow}
                                                       className={s.errorPopUp}
                                                       header='Error'
                    />}
                </div>
                <div className={s.inputBlock}>
                    <div className={s.inputContainer}>
                        <label>Email</label>
                        <input type='text' value={valueEmail}
                               onChange={onChangeInput}
                               data-input='email'
                               autoComplete="off"
                               className={classNameInput}
                        />
                    </div>
                    <div className={s.inputContainer}>
                        <label>Password</label>
                        <input type={type} value={valuePassword}
                               onChange={onChangeInput}
                               data-input='onePassword'
                               autoComplete="off"
                               required
                               className={classNameInput}
                        />
                        <img src={eye} onClick={changeTypeForInput}/>
                    </div>
                </div>
                <div className={s.linkForgotPass}><Link to='/'>Forgot Password</Link></div>
                <div className={s.control}>
                    <SuperButton onClick={sendLoginData} disabled={!!error}>
                        Login
                    </SuperButton>
                    <p>Don't have an account?</p>
                    <Link to={path.signup} className={classNameLink}>Sign up</Link>
                </div>
            </div>
        </div>
    );
})

