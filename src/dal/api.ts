import axios, {AxiosResponse} from "axios";
import {throwNewError} from "../utils/error-utils";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
});

export const authAPI = {
    registration(email: string, password: string):Promise<void | AxiosResponse<RegistrationResponse>> {
        return instance
            .post<RegistrationResponse, AxiosResponse<RegistrationResponse>, { email: string, password: string }>
            ('/auth/register', {email: email, password: password})
            .then((res) => res)
            .catch(err => {
                throwNewError(err)
            })
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