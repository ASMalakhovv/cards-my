import {Navigate} from "react-router-dom";
import {ReactElement} from "react";
import {useAppSelector} from "../../../hooks/useReactRedux";

type PropsType = {
    children: ReactElement<any, any>
}
const RequireAuth = ({children, ...props}: PropsType) => {
    const profileID = useAppSelector(state => state.profile._id)
    if (!profileID) {
        return <Navigate to='/login'/>
    }
    return children;
};

export default RequireAuth;