import React from 'react';
import s from "./Table.module.scss"
import Search from "../SettingsPackTable/SearchPack/Search";
import HeaderTable from "./HeaderTable/HeaderTable";
import Pack from "./Pack/Pack";
import Pagination from "../SettingsPackTable/Pagination/Pagination";
import {useAppSelector} from "../../../hooks/useReactRedux";
import {CardPack} from "../../../dal/api";

const Table = () => {

    //react-redux
    const packs: CardPack[] = useAppSelector(state => state.packs.cardPacks)

    //заполняем таблицу
    const packsTable = packs.map(p => {
        return <Pack key={p._id} name={p.name} update={p.updated}
                     cards={p.cardsCount} created={p.created} id={p._id}/>
            })


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
                    <Pagination/>
                </div>
            </div>
        </div>
    );
};

export default Table;