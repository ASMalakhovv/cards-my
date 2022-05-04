export type InitStateType = typeof initState

const initState = {}

export type ProfileAction = { type: '', };
export const profileReducer = (state: InitStateType = initState, action: ProfileAction): InitStateType => {
    switch (action.type) {
        case '': {
            return state
        }
        default:
            return state
    }
}
