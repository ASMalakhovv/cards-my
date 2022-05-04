const initStateApp = {
    isLoading: false
}

export const appReducer = (state = initStateApp, action: AppAction): InitStateTypeApp => {
    switch (action.type) {
        case '' : {
            return state
        }
        default:
            return state

    }
}

//ACTION CREATOR

const changeIsLoading = (payload: boolean) => {
    return {
        type: 'app/CHANGE-IS-LOADING',
        payload
    }
}

//TYPES
type ChangeIsLoading = ReturnType<typeof changeIsLoading>
export type InitStateTypeApp = typeof initStateApp
type AppAction = ChangeIsLoading