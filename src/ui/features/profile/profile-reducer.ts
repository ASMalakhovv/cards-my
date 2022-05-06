import {ProfileResponse} from "../../../dal/api";

export type InitStateType = typeof initState

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
}

export const profileReducer = (state: InitStateType = initState, action: ProfileAction): InitStateType => {
    switch (action.type) {
        case 'profile/SET-PROFILE': {
            return {...state, ...action.payload}
        }
        default:
            return state
    }
}

//ACTION-CREATOR
export const setProfile = (payload: ProfileResponse | InitStateType) => {
    return {
        type: 'profile/SET-PROFILE',
        payload
    }
}

//TYPES
export type ProfileAction = SetProfile
export type SetProfile = ReturnType<typeof setProfile>