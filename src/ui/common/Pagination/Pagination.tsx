import Pagination from '@mui/material/Pagination/Pagination';
import React from 'react';


type PropsType = {
    totalCount: number | null
    page: number | null
    onChange: (page: number) => void
}

const PaginationPack = ({totalCount, page, onChange, ...props}: PropsType) => {

    //вычисление количества страниц по 10 колод
    let numberPage: number = 0;
    if (totalCount) {
        numberPage = Math.ceil(totalCount / 10)
    }

    //callbacks
    const onChangeHandler = (event: React.ChangeEvent<unknown>, page: number) => {
        onChange(page)

    }

    return (
        <Pagination count={numberPage} shape="rounded" onChange={onChangeHandler} page={page ? page : 1}/>
    );
};

export default PaginationPack;

