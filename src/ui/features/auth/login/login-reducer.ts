export type InitStateType = typeof initState

const initState = {}

export type LoginAction = { type: '', };
export const loginReducer = (state: InitStateType = initState, action: LoginAction): InitStateType => {
    switch (action.type) {
        case '': {
            return state
        }
        default:
            return state
    }
}
