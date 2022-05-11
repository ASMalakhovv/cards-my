import {profileAPI, ProfileResponse} from "../../../dal/api";
import {AppThunk} from "../../../bll/store";
import {saveErrorApp} from "../../../app/app-reducer";


const initState = {
    _id: null as null | string,
    email: null as null | string,
    rememberMe: false,
    isAdmin: false,
    name: null as null | string,
    verified: false,
    publicCardPacksCount: null as null | number,
    created: null as null | string,
    updated: null as null | string,
    __v: null as null | number,
    token: null as null | string,
    tokenDeathTime: null as null | number,
    avatar: null as null | string,
    setting: {
        error: null as null | string,
        message: null as null | string,
        isLoading: false
    }
}

export const profileReducer = (state: InitStateTypeProfile = initState, action: ProfileAction): InitStateTypeProfile => {
    switch (action.type) {
        case "profile/SET-ERROR": {
            return {...state, setting: {...state.setting, error: action.payload}}
        }
        case "profile/SET-MESSAGE": {
            return {...state, setting: {...state.setting, message: action.payload}}
        }
        case "profile/SET-IS-LOADING": {
            return {...state, setting: {...state.setting, isLoading: action.payload}}
        }
        case 'profile/SET-PROFILE': {
            return {...state, ...action.payload}
        }
        default:
            return state
    }
}

//ACTION-CREATOR
export const setProfile = (payload: ProfileResponse) => {
    return {
        type: 'profile/SET-PROFILE',
        payload
    } as const
}
export const setErrorProfile = (payload: string | null) => {
    return {
        type: 'profile/SET-ERROR',
        payload
    } as const
}
export const setMessageProfile = (payload: string | null) => {
    return {
        type: 'profile/SET-MESSAGE',
        payload
    } as const
}
export const setIsLoadingProfile = (payload: boolean) => {
    return {
        type: 'profile/SET-IS-LOADING',
        payload
    } as const
}

//THUNK-CREATOR
export const changeNickname = (nickname: string): AppThunk<void> => async dispatch => {
    try {
        dispatch(setIsLoadingProfile(true))
        const res = await profileAPI.changeNickName(nickname)
        res && dispatch(setProfile(res))
        dispatch(setMessageProfile('Nickname successfully changed'))
    } catch (e) {
        if (e instanceof Error) {
            dispatch(setErrorProfile(e.message))
        } else if (typeof e === "string") {
            dispatch(setErrorProfile(e))
        } else {
            dispatch(setErrorProfile('An error has occurred'))
            console.error(`An error has occurred. Contact the administrator. Error data: ${e}`)
        }
    } finally {
        dispatch(setIsLoadingProfile(false))
    }
}

//TYPES
export type InitStateTypeProfile = typeof initState
export type ProfileAction = SetProfile | SetErrorProfile | SetMessageProfile | SetIsLoadingProfile
export type SetProfile = ReturnType<typeof setProfile>
export type SetErrorProfile = ReturnType<typeof setErrorProfile>
export type SetMessageProfile = ReturnType<typeof setMessageProfile>
export type SetIsLoadingProfile = ReturnType<typeof setIsLoadingProfile>