import React from 'react';
import s from './ShowPacksCards.module.scss'
import SortMyAll from "./SortMyAll/SortMyAll";
import SortRange from "./SortRange/SortRange";

const ShowPacksCards = () => {
    return (
        <div className={s.showBlock}>
            <div className={s.showContainer}>
                <h1>Show packs cards</h1>
                <SortMyAll/>
                <SortRange/>
            </div>
        </div>
    );
};

export default ShowPacksCards;