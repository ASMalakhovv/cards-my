import {AppThunk} from "../../../../bll/store";
import {authAPI} from "../../../../dal/api";


const initState = {
    isLoading: false,
    error: null as string | null,
    message: null as string | null
}

export const passwordNewReducer = (state: InitStateNewPasswordType = initState, action: NewPasswordAction): InitStateNewPasswordType => {
    switch (action.type) {
        case "new-password/SET-MESSAGE": {
            return {...state, message: action.payload}
        }
        case "new-password/SET-ERROR": {
            return {...state, error: action.payload}
        }
        case "new-password/CHANGE-IS-LOADING": {
            return {...state, isLoading: action.payload}
        }
        default:
            return state
    }
}

//ACTION-CREATOR
export const changeIsLoadingNewPassword = (payload: boolean) => {
    return {
        type: 'new-password/CHANGE-IS-LOADING',
        payload
    } as const
}
export const setErrorNewPassword = (payload: string | null) => {
    return {
        type: 'new-password/SET-ERROR',
        payload
    } as const
}
export const setMessageNewPassword = (payload: string | null) => {
    return {
        type: 'new-password/SET-MESSAGE',
        payload
    } as const
}

//THUNK-CREATOR
export const setNewPassword = (password: string, token: string): AppThunk<void> => async dispatch => {
    try {
        dispatch(changeIsLoadingNewPassword(true))
        let res = await authAPI.newPassword(password, token)
        res && dispatch(setMessageNewPassword(res.info))
    } catch (err) {
        if (err instanceof Error) {
            dispatch(setErrorNewPassword(err.message))
            console.log(err.message)
        } else if (typeof err === "string") {
            dispatch(setErrorNewPassword(err))
            console.log(err)
        } else {
            dispatch(setErrorNewPassword('An error has occurred'))
            console.error(`An error has occurred. Contact the administrator. Error data: ${err}`)
        }
    } finally {
        dispatch(changeIsLoadingNewPassword(false))
    }
}

//TYPES
export type InitStateNewPasswordType = typeof initState
export type NewPasswordAction = ChangeIsLoadingNewPassword | SetErrorNewPassword | SetMessageNewPassword
export type ChangeIsLoadingNewPassword = ReturnType<typeof changeIsLoadingNewPassword>
export type SetErrorNewPassword = ReturnType<typeof setErrorNewPassword>
export type SetMessageNewPassword = ReturnType<typeof setMessageNewPassword>
