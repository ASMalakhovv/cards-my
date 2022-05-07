import s from './Register.module.scss'
import SuperButton from "../../../common/SuperButton/SuperButton";
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from '../../../../hooks/useReactRedux';
import {registration, setErrorRegistration, setMessageRegistration} from "./registration-reducer";
import {useNavigate} from 'react-router-dom';
import {Link,Navigate} from 'react-router-dom';
import PopUpWindowRegistration from "../../../components/PopUpWindow/PopUpWindowRegistration/PopUpWindowRegistration";
import {ProgressBar} from "../../../components/ProgressBar/ProgressBar";
import eye from '../../../assets/image/eye.png'
import {useValidationPassword} from "../../../../hooks/useValidationPassword";
import { path } from '../../../main/routes/Pages';
export function Register() {
    //хуки
    const [valueEmail, setValueEmail] = useState("")
    const [valueOnePassword, setValueOnePassword] = useState("")
    const [valueTwoPassword, setValueTwoPassword] = useState("")
    const [type, setType] = useState("password")
    const [errorValidation, testValidation] = useValidationPassword(valueOnePassword, valueEmail, valueTwoPassword)
    const navigate = useNavigate()
    useEffect(() => {
        return () => {
            dispatch(setErrorRegistration(null))
            dispatch(setMessageRegistration(null))
        }
    }, [])

    //реакт-редакс
    const dispatch = useAppDispatch()
    const error: null | string = useAppSelector(state => state.registration.error)
    const message: null | string = useAppSelector(state => state.registration.message)
    const isLoading: boolean = useAppSelector(state => state.registration.isLoading)
    const profileID: string | null = useAppSelector(state => state.profile._id)
    //вычисляем стили
    const classNameLink = message || error ? `${s.disabledLink}` : ''
    const classNameInput = error ? `${s.error}` : ''
    const classNamePopUp = error ? `${s.errorPopUp}` : `${s.messagePopUp}`

    //колбэки
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.dataset.input) {
            const type: string = e.currentTarget.dataset.input
            if (type === 'email') {
                setValueEmail(e.currentTarget.value)
            } else if (type === 'onePassword') {
                setValueOnePassword(e.currentTarget.value)
            } else if (type === 'twoPassword') {
                setValueTwoPassword(e.currentTarget.value)
            }
        }
    }
    const sendRegistrationData = useCallback(() => {
        if (testValidation) {
            dispatch(registration(valueEmail, valueOnePassword))
        } else {
            dispatch(setErrorRegistration(errorValidation))
        }
    }, [valueEmail, valueOnePassword, testValidation, errorValidation])
    const closePopUpWindow = useCallback(() => {
        error && dispatch(setErrorRegistration(null))
        if (message) {
            navigate('/login')
            dispatch(setMessageRegistration(null))
        }
    }, [error, message])

    const changeTypeForInput = () => {
        const computedType = type === 'text' ? 'password' : 'text'
        setType(computedType)
    }

    return (
        profileID
        ?
            <Navigate to={path.profile}/>
        :
        <div className={s.registerContainer}>
            <div className={s.registerBlock}>

                <div className={s.progressBar}>
                    {isLoading && <ProgressBar/>}
                </div>

                <header className={s.header}>
                    <h1>it-incubator</h1>
                    <h2>Sign Up</h2>
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

                <div className={s.inputBlock}>
                    <div className={s.inputContainer}>
                        <label>Email</label>
                        <input type='email' value={valueEmail}
                               onChange={onChangeInput}
                               data-input='email'
                               autoComplete="off"
                               className={classNameInput}
                        />
                    </div>
                    <div className={s.inputContainer}>
                        <label>Password</label>
                        <input type={type} value={valueOnePassword}
                               onChange={onChangeInput}
                               data-input='onePassword'
                               autoComplete="off"
                               required
                               className={classNameInput}
                        />
                        <img src={eye} onClick={changeTypeForInput}/>
                    </div>
                    <div className={s.inputContainer}>
                        <label>Confirm password</label>
                        <input type={type} value={valueTwoPassword}
                               onChange={onChangeInput}
                               data-input='twoPassword'
                               className={classNameInput}
                        />
                    </div>
                </div>

                <div className={s.control}>
                    <Link to={'/login'} className={classNameLink}>go to login</Link>
                    <SuperButton onClick={sendRegistrationData} disabled={!!error || !!message}>
                        Register
                    </SuperButton>
                </div>

            </div>
        </div>
    );
}

