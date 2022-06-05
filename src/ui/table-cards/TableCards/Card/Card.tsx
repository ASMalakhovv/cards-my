import React, {useCallback} from 'react';
import s from './Card.module.scss'
import {useAppDispatch, useAppSelector} from "../../../../hooks/useReactRedux";
import {deleteCard, updateQuestionCard} from "../../packName-reducer";

type PropsType = {
    question: string
    answer: string
    updated: string
    grade: number
    id: string
    packID: string | undefined
    userID: string
}

const Card = ({question, answer, updated, grade, id, packID, userID, ...props}: PropsType) => {
    //react-redux
    const dispatch = useAppDispatch()
    const profileID = useAppSelector(state => state.profile._id)
    const isMyPack = userID === profileID

    //callbacks
    const deleteCardHandler = () => {
        packID && dispatch(deleteCard(id, packID))
    }
    const changeQuestion = useCallback(() => {
        packID && dispatch(updateQuestionCard(id, packID))
    }, [])

    return (
        <div className={s.card}>
            <div className={s.question}>{question}</div>
            <div className={s.answer}>{answer}</div>
            <div className={s.lastUpdate}>{updated}</div>
            <div className={s.grade}>{grade}</div>
            <div>
                {isMyPack && <button onClick={deleteCardHandler}>delete</button>}
            </div>
            <div>
                {isMyPack && <button onClick={changeQuestion}>Change</button>}
            </div>
        </div>
    );
};

export default Card;