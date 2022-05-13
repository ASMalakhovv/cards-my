import Pagination from '@mui/material/Pagination/Pagination';
import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../../hooks/useReactRedux";
import {setPagePacks} from "../setting-reducer";


const PaginationPack = () => {
    //react-redux
    const dispatch = useAppDispatch()
    const cardPacksTotalCount: number | null = useAppSelector(state => state.packs.cardPacksTotalCount)
    const page: number | null = useAppSelector(state => state.settingPacks.page)

    //вычисление количества страниц по 10 колод
    let numberPage: number = 0;
    if (cardPacksTotalCount) {
        numberPage = Math.ceil(cardPacksTotalCount / 10)
    }

    //callbacks
    const onChangeHandler = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(setPagePacks(page))
    }

    return (
        <Pagination count={numberPage} shape="rounded" onChange={onChangeHandler} page={page ? page : 1}/>
    );
};

export default PaginationPack;

