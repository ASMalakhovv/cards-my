import React, {useState} from 'react';
import s from "./Table.module.scss"
import Search from "../SettingsPackTable/SearchPack/Search";
import HeaderTable from "./HeaderTable/HeaderTable";
import Pack from "./Pack/Pack";
import Pagination from "../../common/Pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../../../hooks/useReactRedux";
import {CardPack} from "../../../dal/api";
import {setPagePacks} from "../SettingsPackTable/setting-reducer";

const Table = () => {
    const [isShowModal, setIsShowModal] = useState<boolean>(false)

    //react-redux
    const dispatch = useAppDispatch()
    const packs: CardPack[] = useAppSelector(state => state.packs.cardPacks)
    const cardPacksTotalCount: number | null = useAppSelector(state => state.packs.cardPacksTotalCount)
    const page: number | null = useAppSelector(state => state.packs.page)

    //заполняем таблицу
    const packsTable = packs.map(p => {
        return <Pack key={p._id} name={p.name} update={p.updated}
                     cards={p.cardsCount} created={p.created} id={p._id}/>
    })

    //callbacks
    const setPage = (page: number) => {
        dispatch(setPagePacks(page))
    }

    return (
        <div className={s.tableBlock}>
            <div className={s.tableContainer}>
                <h1>Packs list</h1>
                <div className={s.searchAddNewContainer}>
                    <Search/>
                </div>
                <div>
                    <HeaderTable/>
                    {packsTable}
                </div>
                <div>
                    <Pagination totalCount={cardPacksTotalCount} page={page} onChange={setPage}/>
                </div>
            </div>
        </div>
    );
};

export default Table;