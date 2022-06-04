import React from 'react';
import s from './Card.module.scss'

type PropsType = {
    question:string
    answer: string
    updated: string
    grade: number
}

const Card = ({question,answer,updated,grade,...props}:PropsType) => {
    return (
        <div className={s.card}>
            <div className={s.question}>{question}</div>
            <div className={s.answer}>{answer}</div>
            <div className={s.lastUpdate}>{updated}</div>
            <div className={s.grade}>{grade}</div>
        </div>
    );
};

export default Card;