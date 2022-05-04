export type InitStateType = typeof initState

const initState = {}

export type PasswordResetAction = { type: '', };
export const passwordResetReducer = (state: InitStateType = initState, action: PasswordResetAction): InitStateType => {
    switch (action.type) {
        case '': {
            return state
        }
        default:
            return state
    }
}
