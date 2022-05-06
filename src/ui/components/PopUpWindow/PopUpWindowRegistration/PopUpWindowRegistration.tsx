import s from './PopUpwindowRegistration.module.scss'

type PropsType = {
    value: string
    callback: () => void
    className: string
    header: string
}

const PopUpWindowRegistration = ({value, callback, className, header, ...props}: PropsType) => {
    return (
        <div className={`${s.popUpBlock} ${className}`}>
            <div className={s.popUpMain}>
                <h2>{header}</h2>
                <p>{value}</p>
                <span onClick={callback} className={s.closeSpan}>&#10008;</span>
            </div>
        </div>
    );
};

export default PopUpWindowRegistration;