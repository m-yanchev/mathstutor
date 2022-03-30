import type {GetDataSource, GetFilter, Lesson} from "./lessons";

export const getDataSource: GetDataSource = (dbAPI) => {

    const {getItem} = dbAPI

    const get = async (filter: GetFilter) : Promise<Lesson> => {
        const {id} = filter
        const {title, finalTestId, exampleIdList} = await getItem("lessons", {id: {N: String(id)}})
        return {
            id: Number(id),
            title: title.S,
            isExamples: Boolean(exampleIdList) && exampleIdList.L.length > 0,
            exampleIdList: Boolean(exampleIdList) ? exampleIdList.L.map(id => Number(id.N)) : [],
            finalTestId: finalTestId ? Number(finalTestId.N) : null
        }
    }

    return {get}
}