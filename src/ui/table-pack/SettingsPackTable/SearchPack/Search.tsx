import React, {ChangeEvent, useState} from 'react';
import s from './Search.module.scss'
import {useAppDispatch} from "../../../../hooks/useReactRedux";
import {setPackNameSort} from "../setting-reducer";
import {createNewPack} from "../../packList-reducer";

const Search = () => {
    //react-redux
    const dispatch = useAppDispatch()

    //hooks
    const [valueInput, setValueInput] = useState<string>("")

    //callbacks
    const changeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.currentTarget.value)
    }
    const searchPackName = () => {
        dispatch(setPackNameSort(valueInput))
    }
    const addNewPack = () => {
        dispatch(createNewPack())
    }

    return (
        <div className={s.searchContainer}>
            <input className={s.input} type='text' value={valueInput}
                   onChange={changeValueInput}
            />
            <button className={s.button} onClick={searchPackName}>Search</button>
            <button className={s.button} onClick={addNewPack}>Add New Pack</button>
        </div>
    );
};

export default Search;