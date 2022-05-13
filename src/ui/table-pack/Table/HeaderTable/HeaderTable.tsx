import React, {useEffect, useMemo, useState} from 'react';
import s from './Header.module.scss'
import {useAppDispatch} from "../../../../hooks/useReactRedux";
import {setSortPacks} from "../../SettingsPackTable/setting-reducer";

const HeaderTable = () => {
    //react-redux
    const dispatch = useAppDispatch()

    //hooks
    const [update, setUpdate] = useState<number | null>(null)
    const sort = update !== null ? update : 0

    useEffect(() => {
        update !== null && dispatch(setSortPacks(`${update}updated`))
    },[update])


    //callbacks
    const changeLastUpdate = () => {
        if (update !== null){
            setUpdate(update === 0 ? 1 : 0)
        } else {
            setUpdate(1)
        }

    }

    return (
        <div className={s.headerContainer}>
            <div>Name</div>
            <div>Cards</div>
            <div onClick={changeLastUpdate} style={{cursor: "pointer", textDecoration:"underline"}}>Last Updated {sort}</div>
            <div>Created by</div>
            <div>Actions</div>
        </div>
    );
};

export default HeaderTable;