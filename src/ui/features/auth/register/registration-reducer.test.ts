import {
    changeIsLoadingRegistration,
    InitStateType,
    registrationReducer,
    setErrorRegistration,
    setMessageRegistration
} from "./registration-reducer";

let initState: InitStateType;
beforeEach(() => {
    initState = {
        error: null,
        isLoading: false,
        message: null,
    }
})

test('should change the isLoading state', () => {
    //action
    let action = changeIsLoadingRegistration(true)
    let state = registrationReducer(initState, action)
    //expect
    expect(state.isLoading).toBe(true)
})

test('should set error', () => {
    //action
    let action = setErrorRegistration('error')
    let state = registrationReducer(initState, action)
    //expect
    expect(state.error).toBe('error')
})

test('should set message', () => {
    //action
    let action = setMessageRegistration('OK')
    let state = registrationReducer(initState, action)
    //expect
    expect(state.message).toBe('OK')
})