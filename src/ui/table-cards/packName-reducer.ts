import {cardsAPI, CardType, GetCards} from "../../dal/api";
import {AppStoreType, AppThunk, AppThunkDispatch} from "../../bll/store";
import {SettingsCardState} from "./settingsCard-reducer";
import {trueQueryParamsCard} from "../../utils/trueQueryParams";

export const initState = {
    cards: [] as CardType[],
    packUserId: null as string | null,
    page: null as number | null,
    pageCount: null as number | null,
    cardsTotalCount: null as number | null,
    minGrade: null as number | null,
    maxGrade: null as number | null,
    token: null as string | null,
    tokenDeathTime: null as number | null,
}

export const packNameReducer = (state: InitStatePackName = initState, action: PackNameAction): InitStatePackName => {
    switch (action.type) {
        case 'packName/SET-CARDS': {
            return {...state, ...action.payload}
        }
        default:
            return state
    }
}

//ACTION CREATOR
export const setCards = (payload: InitStatePackName) => {
    return {
        type: 'packName/SET-CARDS',
        payload
    } as const
}

//THUNK-CREATOR
export const getCards = (id: string): AppThunk<void> => async (dispatch: AppThunkDispatch, getState: () => AppStoreType) => {
    try {
        const settings:SettingsCardState = getState().settingsCard
        const trueSetting = trueQueryParamsCard(settings)
        const res: GetCards = await cardsAPI.getCards(id,trueSetting)
        res && dispatch(setCards(res))
        debugger
    } catch (e) {

    } finally {

    }
}

//TYPES
export type InitStatePackName = typeof initState
export type SetCards = ReturnType<typeof setCards>
export type PackNameAction = SetCards