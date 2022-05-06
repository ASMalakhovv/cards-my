import {useAppSelector} from "./useReactRedux";
import {cardsAPI} from "../dal/api";
import {ActionType, AppThunkDispatch} from "../bll/store";

const useAuth = async (dispatch: AppThunkDispatch, actionCreator: () => ActionType) => {
    const userID: string | null = useAppSelector(state => state.profile._id)
    if (!userID) {
        const res = await cardsAPI.authMe()
        dispatch(actionCreator())
    }
}