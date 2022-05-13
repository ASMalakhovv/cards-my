import React, {useEffect, useState} from 'react';
import s from "../ShowPacksCards.module.scss";
import SuperDoubleRange from "../../../../common/SuperDoubleRange/SuperDoubleRange";
import {useAppDispatch, useAppSelector} from "../../../../../hooks/useReactRedux";
import {setMaxCard, setMinCard} from "../../setting-reducer";

const SortRange = () => {
    //react-redux
    const dispatch = useAppDispatch()
    const min: number = useAppSelector(state => state.packs.minCardsCount)
    const max: number = useAppSelector(state => state.packs.maxCardsCount)

    //hooks
    const [minMax, setMinMax] = useState<number[]>([min, max])

    //callbacks
    const onChangeRange = (minMax: [number, number]) => {
        if (minMax[0] >= min && minMax[1] <= max) {
            setMinMax([minMax[0], minMax[1]])
        }
    }
    const onMouseUpHandler = () => {
        dispatch(setMinCard(String(minMax[0])))
        dispatch(setMaxCard(String(minMax[1])))
    }

    const maxRange = max + 50
    return (
        <div className={s.rangeContainer}>
            Number of cards
            <SuperDoubleRange value={[minMax[0], minMax[1]]}
                              onChangeRange={onChangeRange}
                              onMouseUp={onMouseUpHandler}
                              max={maxRange}
            />
        </div>
    );
};

export default SortRange;