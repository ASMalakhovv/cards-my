import React from 'react';
import PaginationPack from "../../common/Pagination/Pagination";
import HeaderTableCard from "./HeaderTableCard/HeaderTableCard";
import Card from "./Card/Card";
import s from './TableCard.module.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks/useReactRedux";
import {CardType} from "../../../dal/api";
import {setSettingCard} from "../settingsCard-reducer";

const TableCard = () => {
    //react-redux
    const dispatch = useAppDispatch()
    const cards: CardType[] = useAppSelector(state => state.cards.cards)
    const cardsTotalCount: number | null = useAppSelector(state => state.cards.cardsTotalCount)
    const page: number | null = useAppSelector(state => state.settingsCard.page)

    const tableCards = cards.map(c => <Card
        key={c._id}
        answer={c.answer}
        updated={c.updated}
        question={c.question}
        grade={c.grade}
    />)
    //callbacks
    const setPage = (page: number) => {
        dispatch(setSettingCard({key: 'page', value: page}))
    }

    return (
        <div className={s.tableBlock}>
            <div className={s.tableContainer}>
                <div className={s.tableCard}>
                    <HeaderTableCard/>
                    {tableCards}
                </div>
                <div className={s.pagination}>
                    <PaginationPack page={page} onChange={setPage} totalCount={cardsTotalCount}/>
                </div>
            </div>
        </div>
    );
};

export default TableCard;