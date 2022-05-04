import s from './Register.module.scss'
import SuperButton from "../../../common/SuperButton/SuperButton";
import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from '../../../../hooks/useReactRedux';
import {registration, setErrorRegistration, setMessageRegistration} from "./registration-reducer";
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import PopUpWindowRegistration from "../../../components/PopUpWindow/PopUpWindowRegistration/PopUpWindowRegistration";
import {ProgressBar} from "../../../components/ProgressBar/ProgressBar";
import eye from '../../../assets/image/eye.png'
import {useValidationPassword} from "../../../../hooks/useValidationPassword";

export function Register() {
    const [valueEmail, setValueEmail] = useState("")
    const [valueOnePassword, setValueOnePassword] = useState("")
    const [valueTwoPassword, setValueTwoPassword] = useState("")
    const [type, setType] = useState("password")
    const [errorValidation, testValidation] = useValidationPassword(valueOnePassword, valueTwoPassword,valueEmail)
    console.log(testValidation)

    useEffect(() => {
        return () => {
            dispatch(setErrorRegistration(null))
            dispatch(setMessageRegistration(null))
        }
    }, [])

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const error: null | string = useAppSelector(state => state.registration.error)
    const message: null | string = useAppSelector(state => state.registration.message)
    const isLoading: boolean = useAppSelector(state => state.registration.isLoading)
    console.log(error)
    const classNameLink = message || error ? `${s.disabledLink}` : ''
    const classNameInput = error ? `${s.error}` : ''
    const classNamePopUp = error ? `${s.errorPopUp}` : `${s.messagePopUp}`


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
        debugger
        if (testValidation) {
            dispatch(registration(valueEmail, valueOnePassword))
        } else {
            dispatch(setErrorRegistration(errorValidation))
        }
    }, [valueEmail, valueOnePassword,testValidation,errorValidation])

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
        <div className={s.registerContainer}>
            <div className={s.registerBlock}>

                <div className={s.progressBar}>
                    {isLoading && <ProgressBar/>}
                </div>

                <header className={s.header}>
                    <h2>it-incubator</h2>
                    <h1>Sign Up</h1>
                    <span></span>
                </header>

                {error && <PopUpWindowRegistration value={error} callback={closePopUpWindow}
                                                   className={classNamePopUp}
                                                   header='Error'
                />}
                {message && <PopUpWindowRegistration value={message} callback={closePopUpWindow}
                                                     className={classNamePopUp}
                                                     header='Message'
                />}

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

