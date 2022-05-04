export type InitStateType = typeof initState

const initState = {}

export type PasswordNewAction = { type: '', };
export const passwordNewReducer = (state: InitStateType = initState, action: PasswordNewAction): InitStateType => {
    switch (action.type) {
        case '': {
            return state
        }
        default:
            return state
    }
}
