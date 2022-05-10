import s from './PasswordReset.module.scss'
import SuperButton from "../../../common/SuperButton/SuperButton";
import {Link, Navigate} from "react-router-dom";
import {path} from '../../../main/routes/Pages';
import {ChangeEvent, useCallback, useState} from "react";
import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../../hooks/useReactRedux";
import {sendInstructionsTC} from "./passwordReset-reducer";


export const PasswordReset = React.memo(() => {
    //hooks
    const [emailValue, setEmailValue] = useState<string>("")


    //react-redux
    const dispatch = useAppDispatch()
    const message: string | null = useAppSelector(state => state.passwordReset.message)


    //callbacks
    const changeEmailInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.currentTarget.value)
    }, [emailValue, setEmailValue])
    const sendInstructions = useCallback(() => {
        dispatch(sendInstructionsTC(emailValue))
    }, [emailValue])


    return (
        message
            ? <Navigate to={path.checkEmail}/>
            :
            <div className={s.forgotBlock}>
                <div className={s.forgotContainer}>
                    <header>
                        <h1>it-incubator</h1>
                        <h2>Forgot your password?</h2>
                    </header>
                    <div className={s.inputContainer}>
                        <label>Email</label>
                        <input type="email" value={emailValue}
                               onChange={changeEmailInput}
                        />
                        <p>Enter your email address and we will send you further instructions</p>
                    </div>
                    <div className={s.button}>
                        <SuperButton onClick={sendInstructions}>
                            Send Instructions
                        </SuperButton>
                    </div>
                    <footer>
                        <p>Did you remember your password?</p>
                        <Link to={path.login}>Try logging in</Link>
                    </footer>
                </div>
            </div>
    );
})


