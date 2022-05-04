import s from './Error.module.scss'
import {useNavigate} from "react-router-dom";
import {path} from '../../main/routes/Pages';
import SuperButton from "../../common/SuperButton/SuperButton";


export function Error404() {

    let navigate = useNavigate()
    const goHomeHandler = () => {
        navigate(path.profile, {replace: true})
    }
    return (
        <div className={s.errorBlock}>
            <div className={s.errorContainer}>
                <h1>404</h1>
                <p>PAGE NOT FOUND</p>
                <SuperButton onClick={goHomeHandler}>
                    Go home
                </SuperButton>
            </div>
        </div>
    );
}

