import {AppStoreType, AppThunk, AppThunkDispatch} from "../bll/store";
import {appAPI} from "../dal/api";
import {setProfile} from "../ui/features/profile/profile-reducer";
import {useAppSelector} from "../hooks/useReactRedux";

const initStateApp = {
    isLoading: false,
    isInitialization: false,
    error: null as null | string
}

export const appReducer = (state: InitStateTypeApp = initStateApp, action: AppAction): InitStateTypeApp => {
    switch (action.type) {
        case "app/SAVE-ERROR": {
            return {...state, error: action.payload}
        }
        case "app/CHANGE-IS-LOADING": {
            return {...state, isLoading: action.payload}
        }
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
export const saveErrorApp = (payload: string | null) => {
    return {
        type: 'app/SAVE-ERROR',
        payload
    } as const
}


//THUNK-CREATOR
export const initializationApp = (): AppThunk<void> => async (dispatch: AppThunkDispatch, getState: () => AppStoreType) => {
    const profileID = getState().profile._id
    const isInitialization = getState().cardsApp.isInitialization
    try {
        if (!profileID) {
            const res = await appAPI.authMe()
            res && dispatch(setProfile(res))
        }
    } catch (err) {
        if (isInitialization) {
            if (err instanceof Error) {
                dispatch(saveErrorApp(err.message))
            } else if (typeof err === "string") {
                dispatch(saveErrorApp(err))
            } else {
                dispatch(saveErrorApp('An error has occurred'))
                console.error(`An error has occurred. Contact the administrator. Error data: ${err}`)
            }
        }
    } finally {
        dispatch(initializationSuccess())
    }
}


//TYPES
type ChangeIsLoading = ReturnType<typeof changeIsLoading>
type InitializationSuccess = ReturnType<typeof initializationSuccess>
type SaveErrorApp = ReturnType<typeof saveErrorApp>
export type InitStateTypeApp = typeof initStateApp
export type AppAction = ChangeIsLoading | InitializationSuccess | SaveErrorApp