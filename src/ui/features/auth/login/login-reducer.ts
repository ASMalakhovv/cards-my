


const initState = {
    error: null as null | string,
    isLoading: false
}

export const loginReducer = (state: InitStateType = initState, action: LoginAction): InitStateType => {
    switch (action.type) {
        case "login/SET-ERROR": {
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

//TYPES
export type InitStateType = typeof initState
export type LoginAction = ChangeIsLoadingLogin | SetErrorLogin
export type ChangeIsLoadingLogin = ReturnType<typeof changeIsLoadingLogin>
export type SetErrorLogin = ReturnType<typeof setErrorLogin>
