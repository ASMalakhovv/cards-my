import axios, {AxiosResponse} from "axios";
import {throwNewError} from "../utils/error-utils";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
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
    login(email: string, password: string) {
        return instance
            .post<ProfileResponse, AxiosResponse<ProfileResponse>, LoginRequestData>
            ('auth/login', {email: email, password: password, rememberMe: false})
            .then(res => res.data)
            .catch((err) => throwNewError(err))
    }
}

export const cardsAPI = {
    authMe() {
        return instance
            .post<ProfileResponse, AxiosResponse<ProfileResponse>, {}>('auth/me', {})
    }
}

//TYPES
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
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
    token: string
    tokenDeathTime: number
}

export type DeviceTokens = {
    _id: string
    device: string
    token: string
    tokenDeathTime: number
}