import {AppStoreType, AppThunk, AppThunkDispatch} from "../../../../bll/store";
import {authAPI, ProfileResponse} from "../../../../dal/api";
import {InitStateTypeProfile, setProfile} from "../../profile/profile-reducer";
import {changeIsLoading, saveErrorApp} from "../../../../app/app-reducer";


const initState = {
    error: null as null | string,
    isLoading: false
}

export const loginReducer = (state: InitStateType = initState, action: LoginAction): InitStateType => {
    switch (action.type) {
        case 'login/SET-ERROR': {
            return {...state, error: action.payload}
        }
        case 'login/CHANGE-IS-LOADING': {
            return {...state, isLoading: action.payload}
        }
        default:
            return state
    }
}

//ACTION CREATOR
export const changeIsLoadingLogin = (payload: boolean) => {
    return {
        type: 'login/CHANGE-IS-LOADING',
        payload
    } as const
}
export const setErrorLogin = (payload: string | null) => {
    return {
        type: 'login/SET-ERROR',
        payload
    } as const
}

//THUNK-CREATOR
export const login = (email: string, password: string): AppThunk<void> => async dispatch => {
    try {
        dispatch(changeIsLoadingLogin(true))
        let res = await authAPI.login(email, password)
        res && dispatch(setProfile(res))
    } catch (err) {
        if (err instanceof Error) {
            dispatch(setErrorLogin(err.message))
        } else if (typeof err === "string") {
            dispatch(setErrorLogin(err))
        } else {
            dispatch(setErrorLogin('An error has occurred'))
            console.error(`An error has occurred. Contact the administrator. Error data: ${err}`)
        }
    } finally {
        dispatch(changeIsLoadingLogin(false))
    }
}
export const logOut = (): AppThunk<void> => async (dispatch: AppThunkDispatch, getState: () => AppStoreType) => {
    const profile: ProfileResponse = {
        _id: null,
        email: null,
        rememberMe: false,
        isAdmin: false,
        name: null,
        verified: false,
        publicCardPacksCount: null,
        created: null,
        updated: null,
        __v: null,
        token: null,
        tokenDeathTime: null,
        avatar: null
    }
    try {
        dispatch(changeIsLoading(true))
        let res = await authAPI.logOut()
        dispatch(setProfile(profile))
    } catch (err) {
        if (err instanceof Error) {
            dispatch(saveErrorApp(err.message))
        } else if (typeof err === "string") {
            dispatch(saveErrorApp(err))
        } else {
            dispatch(saveErrorApp('An error has occurred'))
            console.error(`An error has occurred. Contact the administrator. Error data: ${err}`)
        }
    } finally {
        dispatch(changeIsLoading(false))
    }
}


//TYPES
export type InitStateType = typeof initState
export type LoginAction = ChangeIsLoadingLogin | SetErrorLogin
export type ChangeIsLoadingLogin = ReturnType<typeof changeIsLoadingLogin>
export type SetErrorLogin = ReturnType<typeof setErrorLogin>
