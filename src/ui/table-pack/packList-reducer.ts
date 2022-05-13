import {AppStoreType, AppThunk, AppThunkDispatch} from "../../bll/store";
import {packApi, QueryParamsGetPack} from "../../dal/api";
import {saveErrorApp} from "../../app/app-reducer";
import {trueQueryParams} from "../../utils/trueQueryParams";

const initState = {
    cardPacks: [
        {
            _id: null as null | string,
            user_id: null as null | string,
            user_name: null as null | string,
            private: false,
            name: null as null | string,
            path: null as null | string,
            grade: null as null | number,
            shots: null as null | number,
            cardsCount: null as null | number,
            type: null as null | string,
            rating: null as null | number,
            created: null as null | string,
            updated: null as null | string,
            more_id: null as null | string,
            __v: null as null | number,
            deckCover: null as null | string,
        },
    ],
    page: null as null | number,
    pageCount: null as null | number,
    cardPacksTotalCount: null as null | number,
    minCardsCount: 0,
    maxCardsCount: 100,
    token: null as null | string,
    tokenDeathTime: null as null | number
}

export const packListReducer = (state: InitStatePackType = initState, action: ActionPackType): InitStatePackType => {
    switch (action.type) {
        case 'pack/SET-PACK': {
            return {...state, ...action.payload}
        }
        default :
            return state
    }
}

//ACTION-CREATOR
const setPack = (payload: InitStatePackType) => {
    return {
        type: "pack/SET-PACK",
        payload
    } as const
}

//THUNK-CREATOR
export const getPack = (): AppThunk<void> => async (dispatch: AppThunkDispatch, getState: () => AppStoreType) => {
    const setting: QueryParamsGetPack = getState().settingPacks
    const trueSetting = trueQueryParams(setting)

    try {
        const res = await packApi.getPacks(trueSetting)
        res && dispatch(setPack(res))
    } catch (e) {
        if (e instanceof Error) {
            dispatch(saveErrorApp(e.message))
        } else if (typeof e === "string") {
            dispatch(saveErrorApp(e))
        } else {
            dispatch(saveErrorApp('An error has occurred'))
            console.error(`An error has occurred. Contact the administrator. Error data: ${e}`)
        }
    } finally {

    }
}
export const createNewPack = (): AppThunk<void> => async (dispatch: AppThunkDispatch, getState: () => AppStoreType) => {

    try {
        const res = await packApi.createNewPack()
        res && dispatch(getPack())
    } catch (e) {
        if (e instanceof Error) {
            dispatch(saveErrorApp(e.message))
        } else if (typeof e === "string") {
            dispatch(saveErrorApp(e))
        } else {
            dispatch(saveErrorApp('An error has occurred'))
            console.error(`An error has occurred. Contact the administrator. Error data: ${e}`)
        }
    } finally {

    }
}
export const deletePack = (id:string): AppThunk<void> => async (dispatch: AppThunkDispatch, getState: () => AppStoreType) => {
    try {
            const res = await packApi.deletePack(id)
            res && dispatch(getPack())
    } catch (e) {
        if (e instanceof Error) {
            dispatch(saveErrorApp(e.message))
        } else if (typeof e === "string") {
            dispatch(saveErrorApp(e))
        } else {
            dispatch(saveErrorApp('An error has occurred'))
            console.error(`An error has occurred. Contact the administrator. Error data: ${e}`)
        }
    } finally {

    }
}
export const updatePack = (id:string): AppThunk<void> => async (dispatch: AppThunkDispatch, getState: () => AppStoreType) => {
    try {
        const res = await packApi.updatePack(id)
        res && dispatch(getPack())
    } catch (e) {
        if (e instanceof Error) {
            dispatch(saveErrorApp(e.message))
        } else if (typeof e === "string") {
            dispatch(saveErrorApp(e))
        } else {
            dispatch(saveErrorApp('An error has occurred'))
            console.error(`An error has occurred. Contact the administrator. Error data: ${e}`)
        }
    } finally {

    }
}

//TYPES
export type InitStatePackType = typeof initState
export type ActionPackType = SetPackAC
export type SetPackAC = ReturnType<typeof setPack>