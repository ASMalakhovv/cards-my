import s from './Profile.module.scss'
import SuperButton from "../../common/SuperButton/SuperButton";
import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/useReactRedux";
import {changeNickname, setErrorProfile, setMessageProfile} from "./profile-reducer";
import {ProgressBar} from "../../components/ProgressBar/ProgressBar";
import PopUpWindowRegistration from "../../components/PopUpWindow/PopUpWindowRegistration/PopUpWindowRegistration";

export function Profile() {
    //react-redux
    const nicknameState = useAppSelector(state => state.profile.name)
    const emailState = useAppSelector(state => state.profile.email)
    const dispatch = useAppDispatch()
    const isLoading: boolean = useAppSelector(state => state.profile.setting.isLoading)
    const error: string | null = useAppSelector(state => state.profile.setting.error)
    const message: string | null = useAppSelector(state => state.profile.setting.message)

    //hooks
    const [nickname, setNickname] = useState<string | null>(nicknameState ? nicknameState : "")
    const [email, setEmail] = useState<string | null>(emailState ? emailState : "")
    useEffect(() => {
        setEmail(emailState)
        setNickname(nicknameState)
    }, [nicknameState, emailState])

    //callbacks
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.dataset.input) {
            const type: string = e.currentTarget.dataset.input
            if (type === 'nickname') {
                setNickname(e.currentTarget.value)
            }
        }
    }
    const saveChangedNickname = useCallback(() => {
        if (nickname?.trim()) {
            dispatch(changeNickname(nickname.trim()))
        }
    }, [nickname])
    const closePopUpWindow = useCallback(() => {
        error && dispatch(setErrorProfile(null))
        message && dispatch(setMessageProfile(null))

    }, [error, message])

    //style compute
    const classNameInput = error ? `${s.error}` : ''
    const classNamePopUp = error ? `${s.errorPopUp}` : `${s.messagePopUp}`

    return (
        <div className={s.profileBlock}>
            <div className={s.profileContainer}>
                <div className={s.progressBar}>
                    {isLoading && <ProgressBar/>}
                </div>
                <header className={s.header}>
                    <h1>Personal Information</h1>
                    <span></span>
                </header>
                <div className={s.popUpContainer}>
                    <div className={s.popUp}>
                        {error && <PopUpWindowRegistration value={error} callback={closePopUpWindow}
                                                           className={classNamePopUp}
                                                           header='Error'
                        />}
                        {message && <PopUpWindowRegistration value={message} callback={closePopUpWindow}
                                                             className={classNamePopUp}
                                                             header='Message'
                        />}
                    </div>
                </div>
                <div className={s.imgProfile}>
                    <img/>
                </div>
                <div className={s.inputBlock}>
                    <div className={s.inputContainer}>
                        <label>Nickname</label>
                        <input type='text' value={nickname || ""}
                               onChange={onChangeInput}
                               data-input='nickname'
                               autoComplete="off"
                               className={classNameInput}
                        />
                    </div>
                    <div className={s.inputContainer}>
                        <label>Email</label>
                        <input type='email' value={email || ""}
                               data-input='email'
                               autoComplete="off"
                               readOnly
                        />
                    </div>
                </div>
                <div className={s.control}>
                    <SuperButton onClick={() => {
                    }} className={s.button}>
                        Cancel
                    </SuperButton>
                    <SuperButton onClick={saveChangedNickname}
                                 className={s.button}
                    disabled={!!error || !!message}
                    >
                        Save
                    </SuperButton>
                </div>
            </div>
        </div>
    )
}
