import {useAppSelector} from "./useReactRedux";
import {appAPI} from "../dal/api";
import {ActionType, AppThunkDispatch} from "../bll/store";

const useAuth = async (dispatch: AppThunkDispatch, actionCreator: () => ActionType) => {
    const userID: string | null = useAppSelector(state => state.profile._id)
    if (!userID) {
        const res = await appAPI.authMe()
        dispatch(actionCreator())
    }
}