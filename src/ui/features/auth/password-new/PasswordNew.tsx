import {Navigate, useParams} from "react-router-dom";
import {ProgressBar} from "../../../components/ProgressBar/ProgressBar";
import PopUpWindowRegistration from "../../../components/PopUpWindow/PopUpWindowRegistration/PopUpWindowRegistration";
import SuperButton from "../../../common/SuperButton/SuperButton";
import {path} from "../../../main/routes/Pages";
import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../hooks/useReactRedux";
import {setErrorNewPassword, setMessageNewPassword, setNewPassword} from "./passwordNew-reducer";
import s from './PasswordNew.module.scss'
import eye from '../../../assets/image/eye.png'

export function PasswordNew() {
    //hooks
    const [valuePassword, setValuePassword] = useState<string>("")
    const [type, setType] = useState<string>("password")

    useEffect(() => {
        return () => {
            dispatch(setErrorNewPassword(null))
            dispatch(setMessageNewPassword(null))
        }
    },[])

    //react-redux
    const isLoading: boolean = useAppSelector(state => state.passwordNew.isLoading)
    const error: string | null = useAppSelector(state => state.passwordNew.error)
    const message: string | null = useAppSelector(state => state.passwordNew.message)
    const dispatch = useAppDispatch()


    //r-r-d
    let {token} = useParams<{ token: string }>()

    //style compute
    const classNameInput = error ? `${s.error}` : ''

    //callbacks
    const changePasswordInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValuePassword(e.currentTarget.value)
    }, [setValuePassword])
    const createNewPassword = useCallback(() => {
        if (token) {
            dispatch(setNewPassword(valuePassword, token))
        }
    }, [token, valuePassword])
    const closePopUpWindow = useCallback(() => {
        error && dispatch(setErrorNewPassword(null))
    }, [error])
    const changeTypeForInput = useCallback(() => {
        const computedType = type === 'text' ? 'password' : 'text'
        setType(computedType)
    }, [type])

    return (
        message
            ? <Navigate to={path.login} replace/>
            :
            <div className={s.newPasswordBlock}>
                <div className={s.newPasswordContainer}>
                    <div className={s.progressBar}>
                        {isLoading && <ProgressBar/>}
                    </div>
                    <header>
                        <h1>it-incubator</h1>
                        <h2>Create new password</h2>
                        <span></span>
                    </header>
                    <div className={s.popUpContainer}>
                        <div className={s.popUp}>
                            {error && <PopUpWindowRegistration value={error} callback={closePopUpWindow}
                                                               className={s.popUp}
                                                               header='Error'
                            />}
                        </div>
                    </div>
                    <div className={s.inputContainer}>
                        <label>Password</label>
                        <input type={type} value={valuePassword}
                               onChange={changePasswordInput}
                               className={classNameInput}
                        />
                        <img src={eye} alt='eye to view entered password'
                             onClick={changeTypeForInput}
                        />
                        <p>Create new password and we will send you further instructions to email</p>
                    </div>
                    <div className={s.button}>
                        <SuperButton onClick={createNewPassword} disabled={isLoading || !!error}>
                            Create new password
                        </SuperButton>
                    </div>
                </div>
            </div>
    )
}

