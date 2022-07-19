import React, {useEffect, useState} from 'react';
import ShowPacksCards from "./SettingsPackTable/ShowPacksCards/ShowPacksCards";
import Table from "./Table/Table";
import s from "./PacksList.module.scss"
import {useAppDispatch, useAppSelector} from "../../hooks/useReactRedux";
import {getPack} from "./packList-reducer";
import { Navigate } from 'react-router-dom';
import { path } from '../main/routes/Pages';
import Modal from "../common/Modal/Modal";
import {ModalLearn} from "../Modal/ModalLearn/ModalLearn";

const PacksList = () => {
    //hooks

    //react-redux
    const dispatch = useAppDispatch()
    const setting = useAppSelector(state => state.settingPacks)
    const userId = useAppSelector(state => state.profile._id)
    useEffect(() => {
        dispatch(getPack())
    }, [setting])

    return (
        !userId
            ? <Navigate to={path.login}/>
            :
            <div className={s.packsListBlock}>
                <div className={s.packsListContainer}>
                    <ShowPacksCards/>
                    <Table/>
                    <Modal height={250} show={true} width={250}>
                    <ModalLearn />
                    </Modal>
                </div>
            </div>
    );
};

export default PacksList;
