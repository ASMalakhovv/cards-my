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
    avatar: null as null | string
}

export const profileReducer = (state: InitStateTypeProfile = initState, action: ProfileAction): InitStateTypeProfile => {
    switch (action.type) {
        case 'profile/SET-PROFILE': {
            return {...state, ...action.payload}
        }
        default:
            return state
    }
}

//ACTION-CREATOR
export const setProfile = (payload: InitStateTypeProfile) => {
    return {
        type: 'profile/SET-PROFILE',
        payload
    } as const
}

//THUNK-CREATOR
export const changeNickname = (nickname: string): AppThunk<void> => async dispatch => {
    try {
        debugger
        const res = await profileAPI.changeNickName(nickname)
        res && dispatch(setProfile(res))
    } catch (e) {
        if (e instanceof Error) {
            dispatch(saveErrorApp(e.message))
        } else if (typeof e === "string") {
            dispatch(saveErrorApp(e))
        } else {
            dispatch(saveErrorApp('An error has occurred'))
            console.error(`An error has occurred. Contact the administrator. Error data: ${e}`)
        }
    } finally {

    }
}

//TYPES
export type InitStateTypeProfile = typeof initState
export type ProfileAction = SetProfile
export type SetProfile = ReturnType<typeof setProfile>