import {Main} from "./ui/main/Main";

import s from './App.module.scss'
import {useAppDispatch, useAppSelector} from "./hooks/useReactRedux";
import {Initialization} from "./app/Initialization/Initialization";
import {useEffect} from "react";
import {initializationApp} from "./app/app-reducer";

function App() {
    const isInitialization: boolean = useAppSelector(state => state.cardsApp.isInitialization)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializationApp())
    }, [])

    return (
        !isInitialization
            ?
            <Initialization/>
            :
            <div className={s.app}>
                <Main/>
            </div>
    );
}

export default App;
