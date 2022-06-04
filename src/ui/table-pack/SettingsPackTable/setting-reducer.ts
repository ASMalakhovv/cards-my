

const initState = {
    packName: "",
    min: null as string | null,
    max: null as string | null,
    sortPacks: "0updated" as string | null,
    page: 1 as number | null,
    pageCount: 10 as number | null,
    user_id: null as string | null,
}

export const settingPacksReducer = (state: InitStateSettingPackType = initState, action: ActionSettingPackType): InitStateSettingPackType => {
    switch (action.type) {
        case "setting/SET-MAX-CARD": {
            return {...state, max: action.payload}
        }
        case "setting/SET-MIN-CARD": {
            return {...state, min: action.payload}
        }
        case "setting/SET-PACK-NAME-SORT": {
            return {...state, packName: action.payload}
        }
        case "setting/SET-PAGE-COUNT-PACKS": {
            return {...state, pageCount: action.payload}
        }
        case "setting/SET-PAGE-PACKS": {
            return {...state, page: action.payload}
        }
        case "setting/SET-SORT-PACKS": {
            return {...state, sortPacks: action.payload}
        }
        case "setting/SET-USER-ID-SORT-PACKS": {
            return {...state, user_id: action.payload}
        }
        default :
            return state
    }
}

//ACTION-CREATOR
export const setPackNameSort = (payload: string) => {
    return {
        type: "setting/SET-PACK-NAME-SORT",
        payload
    } as const
}
export const setMinCard = (payload: string) => {
    return {
        type: "setting/SET-MIN-CARD",
        payload
    } as const
}
export const setMaxCard = (payload: string) => {
    return {
        type: "setting/SET-MAX-CARD",
        payload
    } as const
}
export const setSortPacks = (payload: string) => {
    return {
        type: "setting/SET-SORT-PACKS",
        payload
    } as const
}
export const setPagePacks = (payload: number) => {
    return {
        type: "setting/SET-PAGE-PACKS",
        payload
    } as const
}
export const setPageCountPacks = (payload: number) => {
    return {
        type: "setting/SET-PAGE-COUNT-PACKS",
        payload
    } as const
}
export const setUserIDPackSort = (payload: string | null) => {
    return {
        type: "setting/SET-USER-ID-SORT-PACKS",
        payload
    } as const
}

//THUNK-CREATOR
/*export const getPack = (): AppThunk<void> => async dispatch => {
    try {
        const res = await packApi.getPacks()

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
}*/

//TYPES
export type InitStateSettingPackType = typeof initState
export type ActionSettingPackType = SetPackNameSort | SetMinCard
    | SetMaxCard | SetSortPacks | SetPagePacks | SetPageCountPacks | SetUserIDPackSort
export type SetPackNameSort = ReturnType<typeof setPackNameSort>
export type SetMinCard = ReturnType<typeof setMinCard>
export type SetMaxCard = ReturnType<typeof setMaxCard>
export type SetSortPacks = ReturnType<typeof setSortPacks>
export type SetPagePacks = ReturnType<typeof setPagePacks>
export type SetPageCountPacks = ReturnType<typeof setPageCountPacks>
export type SetUserIDPackSort = ReturnType<typeof setUserIDPackSort>