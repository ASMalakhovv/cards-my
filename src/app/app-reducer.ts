import {AppThunk} from "../bll/store";
import {authAPI, cardsAPI} from "../dal/api";
import {handlingError} from "../utils/error-utils";
import {changeIsLoadingRegistration, setMessageRegistration} from "../ui/features/auth/register/registration-reducer";
import {setProfile} from "../ui/features/profile/profile-reducer";

const initStateApp = {
    isLoading: false,
    isInitialization: false
}

export const appReducer = (state: InitStateTypeApp = initStateApp, action: AppAction): InitStateTypeApp => {
    switch (action.type) {
        case 'app/IS-INITIALIZATION' : {
            return {...state, isInitialization: action.payload}
        }
        default:
            return state

    }
}

//ACTION CREATOR
export const changeIsLoading = (payload: boolean) => {
    return {
        type: 'app/CHANGE-IS-LOADING',
        payload
    } as const
}

export const initializationSuccess = () => {
    return {
        type: 'app/IS-INITIALIZATION',
        payload: true
    } as const
}

//THUNK-CREATOR
export const initializationApp = (profileID: string | null): AppThunk<void> => async dispatch => {
    try {
        if (!profileID) {
            const res = await cardsAPI.authMe()
            dispatch(setProfile(res.data))
        }
    } catch (err: Error | unknown) {
        console.log('авторизуйтесь')
        //handlingError(dispatch, err)
    } finally {
        dispatch(initializationSuccess())
    }
}


//TYPES
type ChangeIsLoading = ReturnType<typeof changeIsLoading>
type InitializationSuccess = ReturnType<typeof initializationSuccess>
export type InitStateTypeApp = typeof initStateApp
export type AppAction = ChangeIsLoading | InitializationSuccess