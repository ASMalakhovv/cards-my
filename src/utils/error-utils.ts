import {AxiosError} from "axios";
import {Dispatch} from "redux";
import {setErrorRegistration} from "../ui/features/auth/register/registration-reducer";


export const throwNewError = (err: AxiosError<{ error: string }>) => {
    if (err.response) {
        throw new Error(err.response.data.error)
    } else if (err.request) {
        throw new Error(err.request)
    } else {
        console.error('ERROR')
    }
}

export const handlingError = (dispatch: Dispatch, err: Error | unknown) => {
    if (err instanceof Error) {
        dispatch(setErrorRegistration(err.message))
    } else {
        //dispatch(setAppError('An error has occurred'))
        console.error(`An error has occurred. Contact the administrator. Error data: ${err}`)
    }
}