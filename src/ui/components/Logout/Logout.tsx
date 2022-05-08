import SuperButton from "../../common/SuperButton/SuperButton";
import React from "react";
import {logOut} from "../../features/auth/login/login-reducer";
import {useAppDispatch, useAppSelector} from "../../../hooks/useReactRedux";

const Logout = () => {
    //hooks
    const isLoadingApp:boolean = useAppSelector(state => state.cardsApp.isLoading)
    //react-redux
    const dispatch = useAppDispatch()

    //callbacks
    const logOutHandler = () => {
        dispatch(logOut())
    }

    return (
        <div>
            <SuperButton onClick={logOutHandler} disabled={isLoadingApp}>
                Log out
            </SuperButton>
        </div>
    );
};

export default Logout;