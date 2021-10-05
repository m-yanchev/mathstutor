type Info = {
    fieldName: string
}
type Parent = {
    finalTestId: number
}
export type Test = {
    id: number
}

const test = (parent: Parent, _, __, info: Info) => {
    const {fieldName} = info
    const getId = () => {
        switch (fieldName) {
            case "finalTest":
                return parent.finalTestId
        }
        throw new Error(`для fieldName=${fieldName} case не предусмотрен`)
    }
    return {id: getId()}
}

export const resolvers = {
    Lesson: {
        finalTest: test
    }
}