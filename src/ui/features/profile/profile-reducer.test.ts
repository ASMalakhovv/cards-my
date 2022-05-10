import {InitStateTypeProfile, profileReducer, setProfile} from "./profile-reducer";


let initState: InitStateTypeProfile;
beforeEach(() => {
    initState = {
        _id: "5eecf82a3ed8f700042f1186",
        email: "nya-admin@nya.nya",
        rememberMe: false,
        isAdmin: false,
        name: "new nameytyt",
        verified: false,
        publicCardPacksCount: 437,
        created: "2020-06-19T17:38:50.679Z",
        updated: "2022-05-05T09:31:24.522Z",
        __v: 0,
        token: "21a29680-cc56-11ec-9ad4-73dc872cc0d5",
        tokenDeathTime: 1651753884520,
        avatar: null,
    }
})

test('must set profile', () => {
    //action
    let profile = {...initState, _id: '2'}
    let action = setProfile(profile)
    let state = profileReducer(initState, action)
    //expect
    expect(state._id).toBe('2')
    expect(initState._id).toBe('5eecf82a3ed8f700042f1186')
})

/*test('should change name', () => {
    //action
    let action = changeNickname('Aleksandr')
    let state = profileReducer(initState, action)
    //expect
    expect(state.name).toBe('Aleksandr')
})*/

/*test('should set message', () => {
    //action
    let action = setMessageRegistration('OK')
    let state = registrationReducer(initState, action)
    //expect
    expect(state.message).toBe('OK')
})*/
