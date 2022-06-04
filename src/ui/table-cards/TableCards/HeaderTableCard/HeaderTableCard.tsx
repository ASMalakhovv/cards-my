import React from 'react';
import s from "./HeaderTableCard.module.scss";

const HeaderTableCard = () => {
    return (
        <div className={s.headerCard}>
            <div className={s.hQuestion}>Question</div>
            <div className={s.hAnswer}>Answer</div>
            <div className={s.hLastUpdate}>Last Update</div>
            <div className={s.hGrade}>Grade</div>
        </div>
    );
};

export default HeaderTableCard;