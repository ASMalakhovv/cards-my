import React, {useEffect} from 'react';
import s from "./PackName.module.scss"
import {useAppDispatch, useAppSelector} from "../../hooks/useReactRedux";
import SearchC from "./SearchCards/SearchC";
import TableCard from "./TableCards/TableCard";
import {useParams} from "react-router-dom";
import {getCards} from "./packName-reducer";
import {Link} from 'react-router-dom';
import arrowLeft from '../assets/image/arrow-left.png'
import {path} from '../main/routes/Pages';

const PackName = () => {
    //react-redux
    const dispatch = useAppDispatch()
    const settings = useAppSelector(state => state.settingsCard)
    //const setting = useAppSelector(state => state.settingPacks)

    //r-r-d
    const {id} = useParams<{ id?: string }>()


    //hooks
    useEffect(() => {
        id && dispatch(getCards(id))
    }, [id,settings])

    return (
        <div className={s.packsListBlock}>
            <div className={s.packsListContainer}>
                <div className={s.header}>
                    <Link to={path.packsList}><img src={arrowLeft} height={50} width={50}/></Link>
                    Pack Name
                </div>
                <div className={s.search}>
                    <SearchC/>
                </div>
                <div className={s.table}>
                    <TableCard/>
                </div>
            </div>
        </div>
    );
};

export default PackName;