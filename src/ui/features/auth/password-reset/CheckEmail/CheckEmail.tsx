import s from "./CheckEmail.module.scss"
import {useLocation} from "react-router-dom";
import approvedEmail from "../../../../assets/image/approved_mail.png";

export const CheckEmail = () => {
    //r-r-d
    let location = useLocation()
    const locationState = location.state as { email: string }

    //hooks

    return (
        <div className={s.checkBlock}>
            <div className={s.checkContainer}>
                <header className={s.header}>
                    <h1>it-incubator</h1>
                </header>
                <div className={s.img}>
                    <img src={approvedEmail}/>
                </div>
                <div className={s.main}>
                    <h1>Check Email</h1>
                    <span></span>
                    <p>We've sent an Email with instructions to {locationState.email}</p>
                </div>
            </div>
        </div>
    );
};
