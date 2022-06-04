import {QueryParamsGetCard, QueryParamsGetPack} from "../dal/api";


export const trueQueryParams = (obj: QueryParamsGetPack): QueryParamsGetPack => {
    let key = Object.keys(obj)
    let trueParams: QueryParamsGetPack = {}
    key.forEach((e, i) => {
        // @ts-ignore
        if (obj[e] !== "" && obj[e] !== null) {
            // @ts-ignore
            trueParams[e] = obj[e]
        }
    })
    return trueParams
}
export const trueQueryParamsCard = (obj: QueryParamsGetCard): QueryParamsGetCard => {
    let key = Object.keys(obj)
    let trueParams: QueryParamsGetCard = {}
    key.forEach((e, i) => {
        // @ts-ignore
        if (obj[e] !== "" && obj[e] !== null) {
            // @ts-ignore
            trueParams[e] = obj[e]
        }
    })
    return trueParams
}