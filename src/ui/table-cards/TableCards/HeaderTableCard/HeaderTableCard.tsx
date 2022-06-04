import React, {useCallback, useEffect, useState} from 'react';
import s from "./HeaderTableCard.module.scss";
import arrowDown from '../../../assets/image/arrow-down.png'
import arrowUp from '../../../assets/image/arrow-up.png'
import {useDebounce} from "../../../../hooks/useDebounce";
import {useAppDispatch} from "../../../../hooks/useReactRedux";
import {setSettingCard} from "../../settingsCard-reducer";

type UpdateCard = null | '0updated' | '1updated'

const HeaderTableCard = () => {
    //hooks
    const [update, setUpdate] = useState<UpdateCard>(null)
    const answerParameter = useDebounce(update, 500)
    //react-redux
    const dispatch = useAppDispatch()
    useEffect(() => {
        update && dispatch(setSettingCard({key: 'sortCards', value: update}))
    }, [answerParameter])

    //action
    const updateImage = update === '1updated' ? arrowUp : update === '0updated'
        ? arrowDown
        : null

    const changeUpdate = useCallback(() => {
        if (update === null || update === '0updated') {
            setUpdate('1updated')
        }
        if (update === null || update === '1updated') {
            setUpdate('0updated')
        }
    }, [update])

    return (
        <div className={s.headerCard}>
            <div className={s.hQuestion}>Question</div>
            <div className={s.hAnswer}>Answer</div>
            <div className={s.hLastUpdate} onClick={changeUpdate}>
                Last Update {updateImage && <img src={updateImage} height={20} width={15}/>}
            </div>
            <div className={s.hGrade}>Grade</div>
            <div>Actions</div>
        </div>
    );
};

export default HeaderTableCard;