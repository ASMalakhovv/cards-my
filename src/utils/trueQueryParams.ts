import {QueryParamsGetPack} from "../dal/api";

export const trueQueryParams = (obj:QueryParamsGetPack):QueryParamsGetPack => {
    type KeyObj = QueryParamsGetPack
    let key = Object.keys(obj)
    let trueParams:QueryParamsGetPack = {}
    key.forEach((e, i) => {
        // @ts-ignore
        if(obj[e] !== "" && obj[e] !== null) {
            // @ts-ignore
            trueParams[e] = obj[e]
        }
    })
    return trueParams
}