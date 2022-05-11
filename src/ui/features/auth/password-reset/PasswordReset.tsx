import s from './PasswordReset.module.scss'
import SuperButton from "../../../common/SuperButton/SuperButton";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {path} from '../../../main/routes/Pages';
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../../hooks/useReactRedux";
import {sendInstructionsTC, setErrorReset, setMessageReset} from "./passwordReset-reducer";
import {ProgressBar} from "../../../components/ProgressBar/ProgressBar";
import PopUpWindowRegistration from "../../../components/PopUpWindow/PopUpWindowRegistration/PopUpWindowRegistration";


export const PasswordReset = React.memo(() => {
    //hooks
    const [emailValue, setEmailValue] = useState<string>("")
    const navigate = useNavigate()
    useEffect(() => {
        return () => {
            dispatch(setMessageReset(null))
        }
    }, [])

    //react-redux
    const dispatch = useAppDispatch()
    const message: string | null = useAppSelector(state => state.passwordReset.message)
    const isLoading: boolean = useAppSelector(state => state.passwordReset.isLoading)
    const error: string | null = useAppSelector(state => state.passwordReset.error)
    const profileID: string | null = useAppSelector(state => state.profile._id)

    //redirect on success
    useEffect(() => {
        message && navigate(path.checkEmail, {replace: true, state: {email: emailValue}})
    }, [message])

    //style compute
    const classNameInput = error ? `${s.error}` : ''
    const classNameLink = error || isLoading ? `${s.disabledLink}` : ''

    //callbacks
    const changeEmailInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.currentTarget.value)
    }, [emailValue, setEmailValue])
    const sendInstructions = useCallback(() => {
        dispatch(sendInstructionsTC(emailValue))
    }, [emailValue])
    const closePopUpWindow = useCallback(() => {
        error && dispatch(setErrorReset(null))
    }, [error])


    return (
        profileID ?
            <Navigate to={path.profile}/>
            :
            <div className={s.forgotBlock}>
                <div className={s.forgotContainer}>
                    <div className={s.progressBar}>
                        {isLoading && <ProgressBar/>}
                    </div>
                    <header>
                        <h1>it-incubator</h1>
                        <h2>Forgot your password?</h2>
                        <span></span>
                    </header>
                    <div className={s.popUpContainer}>
                        <div className={s.popUp}>
                            {error && <PopUpWindowRegistration value={error} callback={closePopUpWindow}
                                                               className={s.popUp}
                                                               header='Error'
                            />}
                        </div>
                        <div className={s.inputContainer}>
                            <label>Email</label>
                            <input type="email" value={emailValue}
                                   onChange={changeEmailInput}
                                   className={classNameInput}
                            />
                            <p>Enter your email address and we will send you further instructions</p>
                        </div>
                        <div className={s.button}>
                            <SuperButton onClick={sendInstructions} disabled={isLoading || !!error}>
                                Send Instructions
                            </SuperButton>
                        </div>
                        <footer>
                            <p>Did you remember your password?</p>
                            <Link to={path.login} className={classNameLink}>Try logging in</Link>
                        </footer>
                    </div>
                </div>
            </div>
    )
})


