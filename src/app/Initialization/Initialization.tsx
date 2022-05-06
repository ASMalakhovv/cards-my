import initialization from '../../ui/assets/image/initialization.gif'
import s from './Initialization.module.scss'

export const Initialization = () => {
    return (
        <div className={s.initBlock}>
            <div className={s.init}>
                <img src={initialization}/>
            </div>
        </div>
    );
};

