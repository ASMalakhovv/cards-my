export type SettingCard = {}

const initState = {
    cardAnswer: null as string | null,
    cardQuestion: null as string | null,
    min: null as number | null,
    max: null as number | null,
    sortCards: null as string | null,
    page: 1 as number | null,
    pageCount: 10 as number | null
}
export type SettingsStateKeys = keyof SettingsCardState


export const settingsCardReducer = (state: SettingsCardState = initState, action: SettingsCardAction) => {
    switch (action.type) {
        /*case "settingsCard/SET-CARD-ANSWER": {
            return {...state, cardAnswer: action.payload}
        }
        case "settingsCard/SET-CARD-QUESTION": {
            return {...state, cardQuestion: action.payload}
        }
        case "settingsCard/SET-CARD-MIN": {
            return {...state, min: action.payload}
        }
        case "settingsCard/SET-CARD-MAX": {
            return {...state, max: action.payload}
        }
        case "settingsCard/SET-SORT-CARDS": {
            return {...state, sortCards: action.payload}
        }
        case "settingsCard/SET-CARD-PAGE": {
            return {...state, page: action.payload}
        }
        case "settingsCard/SET-CARD-PAGE-COUNT": {
            return {...state, pageCount: action.payload}
        }*/
        case "settingsCard/SET-SETTING": {
            return {...state, [action.payload.key]: action.payload.value}
        }
        default :
            return state
    }
}

//action-creator
export const setSettingCard = (payload: { key: SettingsStateKeys, value: string | number | null }) => {
    return {
        type: 'settingsCard/SET-SETTING',
        payload
    } as const
}

//types
export type SettingsCardAction = ReturnType<typeof setSettingCard>
export type SettingsCardState = typeof initState


