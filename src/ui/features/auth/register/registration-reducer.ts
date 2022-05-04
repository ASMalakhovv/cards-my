import {AppThunk} from "../../../../bll/store";
import {authAPI} from "../../../../dal/api";
import {handlingError} from "../../../../utils/error-utils";


const initState = {
    error: null as null | string,
    message: null as null | string,
    isLoading: false
}


export const registrationReducer = (state: InitStateType = initState, action: RegistrationAction): InitStateType => {
    switch (action.type) {
        case "reg/SET-MESSAGE": {
            return {...state, message: action.payload}
        }
        case "reg/SET-ERROR": {
            return {...state, error: action.payload}
        }
        case 'reg/CHANGE-IS-LOADING': {
            return {...state, isLoading: action.payload}
        }
        default:
            return state
    }
}

//ACTION CREATOR
export const changeIsLoadingRegistration = (payload: boolean) => {
    return {
        type: 'reg/CHANGE-IS-LOADING',
        payload
    } as const
}
export const setErrorRegistration = (payload: string | null) => {
    return {
        type: 'reg/SET-ERROR',
        payload
    } as const
}
export const setMessageRegistration = (payload: string | null) => {
    return {
        type: 'reg/SET-MESSAGE',
        payload
    } as const
}

//THUNK CREATOR
export const registration = (email: string, password: string): AppThunk<void> => async dispatch => {
    try {
        dispatch(changeIsLoadingRegistration(true))
        await authAPI.registration(email, password)
        dispatch(setMessageRegistration('registration completed successfully'))
    } catch (err: Error | unknown) {
        handlingError(dispatch, err)
    } finally {
        dispatch(changeIsLoadingRegistration(false))
    }
}

//TYPES
export type InitStateType = typeof initState
export type RegistrationAction = changeIsLoadingReg | setErrorReg | setMessageReg
export type changeIsLoadingReg = ReturnType<typeof changeIsLoadingRegistration>
export type setErrorReg = ReturnType<typeof setErrorRegistration>
export type setMessageReg = ReturnType<typeof setMessageRegistration>


