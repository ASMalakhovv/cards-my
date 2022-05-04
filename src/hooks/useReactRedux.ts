import {TypedUseSelectorHook, useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {AppStoreType, AppThunkDispatch} from "../bll/store";

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector