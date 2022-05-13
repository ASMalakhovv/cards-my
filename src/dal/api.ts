import axios, {AxiosResponse} from "axios";
import {from, message} from "../ui/features/auth/password-reset/templateEmail/templateEmail";
import {createPromiseRej, throwNewError} from "../utils/error-utils";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    //baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
});

export const authAPI = {
    registration(email: string, password: string): Promise<void | AxiosResponse<RegistrationResponse>> {
        return instance
            .post<RegistrationResponse, AxiosResponse<RegistrationResponse>, { email: string, password: string }>
            ('/auth/register', {email: email, password: password})
            .then((res) => res)
            .catch(err => {
                throwNewError(err)
            })
    },
    login(email: string, password: string): Promise<void | ProfileResponse> {
        return instance
            .post<ProfileResponse, AxiosResponse<ProfileResponse>, LoginRequestData>
            ('auth/login', {email: email, password: password, rememberMe: false})
            .then(res => res.data)
            .catch((err) => createPromiseRej(err))
    },
    logOut() {
        return instance
            .delete<LogOutNewPasswordResponse, AxiosResponse<LogOutNewPasswordResponse>>('auth/me')
    },
    resetPassword(email: string): Promise<void | ResetPassword> {
        return instance
            .post<ResetPassword, AxiosResponse<ResetPassword>, { email: string, from: string, message: string }>
            ('auth/forgot', {email, from, message})
            .then((res) => {
                return res.data
            })
            .catch(err => createPromiseRej(err))
    },
    newPassword(password: string, resetPasswordToken: string): Promise<void | LogOutNewPasswordResponse> {
        return instance
            .post<LogOutNewPasswordResponse, AxiosResponse<LogOutNewPasswordResponse>, { password: string, resetPasswordToken: string }>
            ('auth/set-new-password', {password, resetPasswordToken})
            .then(res => res.data)
            .catch(err => createPromiseRej(err))
    }
}

export const cardsAPI = {
    authMe(): Promise<void | ProfileResponse> {
        return instance
            .post<ProfileResponse, AxiosResponse<ProfileResponse>, {}>
            ('auth/me', {})
            .then(res => res.data)
            .catch(err => createPromiseRej(err))
    }
}
export const profileAPI = {
    changeNickName(name?: string, avatar?: string): Promise<void | ProfileResponse> {
        return instance
            .put<ChangeNickname, AxiosResponse<ChangeNickname>, { name?: string, avatar?: string }>
            ('auth/me', {name: name})
            .then(res => res.data.updatedUser)
            .catch(err => createPromiseRej(err))
    }
}


export const packApi = {
    getPacks(queryParam?: QueryParamsGetPack): Promise<void | GetPacks> {
        return instance
            .get<GetPacks, AxiosResponse<GetPacks>, QueryParamsGetPack>
            ('cards/pack', {params: {...queryParam}})
            .then(res => res.data)
            .catch(err => createPromiseRej(err))
    },
    createNewPack() {
        return instance
            .post('cards/pack', {cardsPack: {}})
            .then(res => res.data)
            .catch(err => createPromiseRej(err))
    },
    deletePack(id: string) {
        return instance
            .delete('cards/pack', {params: {id}})
            .then(res => res.data)
            .catch(err => createPromiseRej(err))
    },
    updatePack(_id: string) {
        return instance
            .put('cards/pack', {cardsPack: {_id}})
            .then(res => res.data)
            .catch(err => createPromiseRej(err))
    }
}

//TYPES
export type QueryParamsGetPack = {
    packName?: string
    min?: string | null
    max?: string | null
    sortPacks?: string | null
    page?: number | null
    pageCount?: number | null
    user_id?: string | null
}
export type RegistrationResponse = {
    _id: string,
    email: string,
    rememberMe: boolean,
    isAdmin: boolean,
    name: string,
    verified: boolean,
    publicCardPacksCount: number,
    created: string,
    updated: string,
    __v: number
}
export type LoginRequestData = {
    email: string
    password: string
    rememberMe: boolean
}
export type ProfileResponse = {
    _id: null | string,
    email: null | string,
    rememberMe: boolean,
    isAdmin: boolean,
    name: null | string,
    verified: boolean,
    publicCardPacksCount: null | number,
    created: null | string,
    updated: null | string,
    __v: null | number,
    token: null | string,
    tokenDeathTime: null | number,
    avatar: null | string
}
export type DeviceTokens = {
    _id: string
    device: string
    token: string
    tokenDeathTime: number
}
export type LogOutNewPasswordResponse = {
    info: string
}
export type ChangeNickname = {
    updatedUser: ProfileResponse
    token: string
    tokenDeathTime: number
}
export type ResetPassword = {
    answer: boolean
    html: boolean
    info: string
    success: boolean
}
export type GetPacks = {
    cardPacks: CardPack []
    page: null | number
    pageCount: null | number
    cardPacksTotalCount: null | number
    minCardsCount: number
    maxCardsCount: number
    token: null | string
    tokenDeathTime: null | number
}
export type CardPack = {
    _id: null | string
    user_id: null | string
    user_name: null | string
    private: boolean
    name: null | string
    path: null | string
    grade: null | number
    shots: null | number
    cardsCount: null | number
    type: null | string
    rating: null | number
    created: null | string
    updated: null | string
    more_id: null | string
    __v: null | number
    deckCover: null | string
}