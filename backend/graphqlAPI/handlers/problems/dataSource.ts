import {GetDataSource, GetFilter, Illus, IllusItem, Item, Problem} from "./problems";

export const getDataSource: GetDataSource = (dbAPI) => {

    const {getItem} = dbAPI

    const get = async (filter: GetFilter) : Promise<Problem> => {
        const {id} = filter
        const item: Item = await getItem("problems", {id: {N: String(id)}})
        const getIllus = (item: IllusItem | void): Illus | null =>
            item ? {name: item.M.name ? item.M.name.S : null} : null
        return {
            id,
            commonDesc: item.commonDesc ? item.commonDesc.S : null,
            desc: item.desc.S,
            illus: getIllus(item.illus),
            solution: item.solution ? {desc: item.solution.M.desc.S, illus: getIllus(item.solution.M.illus)} : null,
            answer: item.answer ? item.answer.S : null
        }
    }

    return {get}
}