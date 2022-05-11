import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ProfileAction, profileReducer} from "../ui/features/profile/profile-reducer";
import {registrationReducer, RegistrationAction} from "../ui/features/auth/register/registration-reducer";
import {LoginAction, loginReducer} from "../ui/features/auth/login/login-reducer";
import {
    NewPasswordAction,
    passwordNewReducer
} from "../ui/features/auth/password-new/passwordNew-reducer";
import {PasswordResetAction, passwordResetReducer} from "../ui/features/auth/password-reset/passwordReset-reducer";
import {AppAction, appReducer} from "../app/app-reducer";


//TYPE
export type AppStoreType = ReturnType<typeof reducers>
export type AppThunkDispatch = ThunkDispatch<AppStoreType, unknown, ActionType>;
export type ActionType = AppAction | LoginAction | NewPasswordAction |
    PasswordResetAction | ProfileAction | RegistrationAction
export type AppThunk<ReturnType> = ThunkAction<ReturnType,
    AppStoreType,
    unknown,
    ActionType>


//STATE
const reducers = combineReducers({
    cardsApp: appReducer,
    login: loginReducer,
    passwordNew: passwordNewReducer,
    passwordReset: passwordResetReducer,
    profile: profileReducer,
    registration: registrationReducer
})

const store = createStore(reducers, applyMiddleware(thunk))
export default store


// @ts-ignore
window.store = store // for dev
