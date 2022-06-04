import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import s from './SearchC.module.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks/useReactRedux";
import {setSettingCard} from "../settingsCard-reducer";
import {useDebounce} from "../../../hooks/useDebounce";

const SearchC = () => {
    //react-redux
    const dispatch = useAppDispatch()
    //hooks
    const [valueQuestion, setValueQuestion] = useState<string | null>(null)
    const [valueAnswer, setValueAnswer] = useState<string | null>(null)
    const questionParameter = useDebounce(valueQuestion, 500)
    const answerParameter = useDebounce(valueAnswer, 500)

    useEffect(() => {
        if (questionParameter !== null) {
            dispatch(setSettingCard({key: 'cardQuestion', value: valueQuestion}))
        }
        if (answerParameter !== null) {
            dispatch(setSettingCard({key: 'cardAnswer', value: valueAnswer}))
        }
    }, [questionParameter, answerParameter])


    const profileId: null | string = useAppSelector(state => state.profile._id)
    const packUserId: string | null = useAppSelector(state => state.cards.packUserId)
    const isAddNewCard = profileId && packUserId && packUserId === profileId

    const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.dataset.input) {
            const type: string = e.currentTarget.dataset.input
            if (type === 'question') {
                setValueQuestion(e.currentTarget.value)
            } else if (type === 'answer') {
                setValueAnswer(e.currentTarget.value)
            }
        }
    }, [valueQuestion, valueAnswer])


    return (
        <div className={s.searchContainer}>
            <div className={s.inputContainer}>
                <input className={s.input}
                       placeholder='Search question'
                       value={valueQuestion === null ? "" : valueQuestion}
                       data-input='question'
                       onChange={onChangeInput}
                />
                <input className={s.input}
                       placeholder='Search answer'
                       value={valueAnswer === null ? "" : valueAnswer}
                       data-input='answer'
                       onChange={onChangeInput}
                />
            </div>
            <button className={s.button}>Search</button>
            {isAddNewCard && <button className={s.button}>Add new card</button>}
        </div>
    );
};

export default SearchC;