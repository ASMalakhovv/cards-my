import {
    changeIsLoadingReset,
    InitStateTypeReset,
    passwordResetReducer,
    setErrorReset,
    setMessageReset
} from "./passwordReset-reducer";

let initState: InitStateTypeReset;

beforeEach(() => {
    initState = {
        isLoading: false,
        error: null,
        message: null
    }
})

test('should change loading status', () => {
    //action
    let action = changeIsLoadingReset(true)
    let state = passwordResetReducer(initState, action)

    //expect
    expect(state.isLoading).toBe(true)
    expect(initState.isLoading).toBe(false)
})

test('should set error', () => {
    //action
    let action = setErrorReset('ERROR')
    let state = passwordResetReducer(initState, action)

    //expect
    expect(state.error).toBe('ERROR')
    expect(initState.error).toBe(null)
})

test('should set the message', () => {
    //action
    let action = setMessageReset('Message')
    let state = passwordResetReducer(initState, action)

    //expect
    expect(state.message).toBe('Message')
    expect(initState.message).toBe(null)
})