import {AppThunk} from "../../../../bll/store";
import {authAPI} from "../../../../dal/api";


const initState = {
    isLoading: false,
    error: null as string | null,
    message: null as string | null
}

export const passwordResetReducer = (state: InitStateTypeReset = initState, action: PasswordResetAction): InitStateTypeReset => {
    switch (action.type) {
        case "reset/SET-MESSAGE": {
            return {...state,message: action.payload}
        }
        case "reset/SET-ERROR": {
            return {...state,error: action.payload}
        }
        case "reset/CHANGE-IS-LOADING": {
            return {...state,isLoading: action.payload}
        }
        default:
            return state
    }
}

//ACTION-CREATOR
export const changeIsLoadingReset = (payload: boolean) => {
    return {
        type: 'reset/CHANGE-IS-LOADING',
        payload
    } as const
}
export const setErrorReset = (payload: string | null) => {
    return {
        type: 'reset/SET-ERROR',
        payload
    } as const
}
export const setMessageReset = (payload: string | null) => {
    return {
        type: 'reset/SET-MESSAGE',
        payload
    } as const
}

//THUNK-CREATOR
export const sendInstructionsTC = (email: string): AppThunk<void> => async dispatch => {
    try {
        dispatch(changeIsLoadingReset(true))
        let res = await authAPI.resetPassword(email)
        res && dispatch(setMessageReset(res.info))
    } catch (err) {
        if (err instanceof Error) {
            dispatch(setErrorReset(err.message))
            console.log(err.message)
        } else if (typeof err === "string") {
            dispatch(setErrorReset(err))
            console.log(err)
        } else {
            dispatch(setErrorReset('An error has occurred'))
            console.error(`An error has occurred. Contact the administrator. Error data: ${err}`)
        }
    } finally {
        dispatch(changeIsLoadingReset(false))
    }
}

//TYPES
export type InitStateTypeReset = typeof initState
export type PasswordResetAction = ChangeIsLoadingReset | SetErrorReset | SetMessageReset
export type ChangeIsLoadingReset = ReturnType<typeof changeIsLoadingReset>
export type SetErrorReset = ReturnType<typeof setErrorReset>
export type SetMessageReset = ReturnType<typeof setMessageReset>
