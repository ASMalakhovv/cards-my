import React from 'react';
import SuperButton from "../../../../common/SuperButton/SuperButton";
import s from './SortMyAll.module.scss'
import {useAppDispatch, useAppSelector} from "../../../../../hooks/useReactRedux";
import {setUserIDPackSort} from "../../setting-reducer";

const SortMyAll = () => {
    //react-redux
    const dispatch = useAppDispatch()
    const userID = useAppSelector(state => state.profile._id)
    //callbacks
    const selectMy = () => {
        userID && dispatch(setUserIDPackSort(userID))
    }
    const selectAll = () => {
        userID && dispatch(setUserIDPackSort(null))
    }

    return (
        <div className={s.button}>
            <SuperButton className={s.sButton} onClick={selectMy}>
                My
            </SuperButton>
            <SuperButton className={s.sButton} onClick={selectAll}>
                All
            </SuperButton>
        </div>
    );
};

export default SortMyAll;