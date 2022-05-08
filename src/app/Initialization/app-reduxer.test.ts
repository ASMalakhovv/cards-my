import {appReducer, changeIsLoading, initializationSuccess, InitStateTypeApp, saveErrorApp} from "../app-reducer";


let initState: InitStateTypeApp;
beforeEach(() => {
    initState = {
        isLoading: false,
        isInitialization: false,
        error: null
    }
})

test('should change the isLoading state', () => {
    //action
    let action = changeIsLoading(true)
    let state = appReducer(initState, action)
    //expect
    expect(state.isLoading).toBe(true)
})

test('should change the initialization state of the application', () => {
    //action
    let action = initializationSuccess()
    let state = appReducer(initState, action)
    //expect
    expect(state.isInitialization).toBe(true)
})

test('should save error', () => {
    //action
    let action = saveErrorApp('Error')
    let state = appReducer(initState, action)
    //expect
    expect(state.error).toBe('Error')
})