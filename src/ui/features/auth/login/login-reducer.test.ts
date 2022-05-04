import {changeIsLoadingLogin, InitStateType, loginReducer, setErrorLogin} from "./login-reducer";


let initState: InitStateType;
beforeEach(() => {
    initState = {
        error: null,
        isLoading: false
    }
})

test('should change the isLoading state', () => {
    //action
    let action = changeIsLoadingLogin(true)
    let state = loginReducer(initState, action)
    //expect
    expect(state.isLoading).toBe(true)
    expect(initState.isLoading).toBe(false)
})

test('should set error', () => {
    //action
    let action = setErrorLogin('error')
    let state = loginReducer(initState, action)
    //expect
    expect(state.error).toBe('error')
    expect(initState.error).toBe(null)
})
