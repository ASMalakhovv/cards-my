import s from './Profile.module.scss'
import SuperButton from "../../common/SuperButton/SuperButton";
import {ProgressBar} from "../../components/ProgressBar/ProgressBar";
import {ChangeEvent, useState} from "react";
import {useAppSelector} from "../../../hooks/useReactRedux";

export function Profile() {
    //реакт-редакс
    const nicknameState = useAppSelector(state => state.profile.name)
    const emailState = useAppSelector(state => state.profile.email)
    //хуки
    const [nickname, setNickname] = useState<string>(nicknameState ? nicknameState : "")
    const [email, setEmail] = useState<string>(emailState ? emailState : "")

    //колбэки
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.dataset.input) {
            const type: string = e.currentTarget.dataset.input
            if (type === 'nickname') {
                setNickname(e.currentTarget.value)
            } else if (type === 'email') {
                setEmail(e.currentTarget.value)
            }
        }
    }
    return (
        <div className={s.profileBlock}>
            <div className={s.profileContainer}>
                <div className={s.progressBar}>
                    {/*{isLoading && <ProgressBar/>}*/}
                </div>
                <header className={s.header}>
                    <h1>Personal Information</h1>
                    <span></span>
                </header>
                <div className={s.imgProfile}>
                    <img/>
                </div>
                <div className={s.inputBlock}>
                    <div className={s.inputContainer}>
                        <label>Nickname</label>
                        <input type='text' value={nickname}
                               onChange={onChangeInput}
                               data-input='nickname'
                               autoComplete="off"
                            //                               className={classNameInput}
                        />
                    </div>
                    <div className={s.inputContainer}>
                        <label>Email</label>
                        <input type='email' value={email}
                            //onChange={onChangeInput}
                               data-input='email'
                               autoComplete="off"
                            //      className={classNameInput}
                        />
                    </div>
                </div>
                {/*disabled={!!error || !!message}*/}
                <div className={s.control}>
                    <SuperButton onClick={() => {
                    }} className={s.button}>
                        Cancel
                    </SuperButton>
                    <SuperButton onClick={() => {
                    }} className={s.button}>
                        Save
                    </SuperButton>
                </div>
            </div>
        </div>
    )
}
