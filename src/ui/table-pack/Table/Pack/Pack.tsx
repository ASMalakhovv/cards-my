import React from 'react';
import s from "./Pack.module.scss"
import {useAppDispatch, useAppSelector} from "../../../../hooks/useReactRedux";
import {deletePack, updatePack} from "../../packList-reducer";
import {Link} from "react-router-dom";
import { path } from '../../../main/routes/Pages';

export type PackPropsType = {
    name: string | null
    cards: number | null
    update: string | null
    created: string | null
    id: string | null
}

const Pack = ({name, cards, update, created, id, ...props}: PackPropsType) => {
    //react-redux
    const userIdFromParameters = useAppSelector(state => state.settingPacks.user_id)
    const dispatch = useAppDispatch()

    //callbacks
    const deletePackHandler = () => {
        id && dispatch(deletePack(id))
    }
    const updatePackHandler = () => {
      id && dispatch(updatePack(id))
    }

    return (
        <div className={s.packContainer}>
            <Link to={`${path.packName}/${id}`}>{name}</Link>
            <div>{cards}</div>
            <div>{update}</div>
            <div>{created}</div>
            {userIdFromParameters
                ?
                <div>
                    <button onClick={deletePackHandler}>delete</button>
                    <button onClick={updatePackHandler}>edit</button>
                    <button>learn</button>
                </div>
                :
                <div>
                    <button>learn</button>
                </div>
            }
            
        </div>
    );
};

export default Pack;
