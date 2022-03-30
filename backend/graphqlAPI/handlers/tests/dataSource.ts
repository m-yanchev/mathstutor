import {
    DynamoProblemResultItem,
    DynamoTestResultItem,
    GetProblemResultItem,
    GetProblemResultsDataSource, GetProblemResultsList,
    GetTestResultsDataSource, GetTestResultsItem,
    GetTestResultsList,
    GetTestsDataSource,
    GetTestsItem, ProblemResultData, TestResultData,
} from "./tests";

export const getTestsDataSource: GetTestsDataSource = dbAPI => {

    const getItem: GetTestsItem = async filter => {
        const {id} = filter
        const {exercises, title} = await dbAPI.getItem("tests", {id: {N: String(id)}})
        return {
            id,
            title: title.S,
            exercises: exercises.L.map(({M}) => {
                const {problemIdList, withDetailedAnswer, maxEstimate} = M
                return {
                    problemIdList: problemIdList.L.map(id => Number(id.N)),
                    withDetailedAnswer: withDetailedAnswer ? withDetailedAnswer.BOOL : false,
                    maxEstimate: Number(maxEstimate.N)
                }
            }),
        }
    }

    return {getItem}
}

export const getTestResultsDataSource: GetTestResultsDataSource = dbAPI => {

    const getResponse = (item: DynamoTestResultItem): TestResultData => ({
        msTimeStamp: item.msTimeStamp.S,
        isFinished: Boolean(item.finishedTimeStamp)
    })

    const getList: GetTestResultsList = async filter => {
        const {studentId} = filter
        const list = await dbAPI.getItems("testResults", {
            expression: `userId = :studentId`,
            values: {":studentId": {S: studentId}}
        })
        return list.map(item => getResponse(item))
    }

    const getItem: GetTestResultsItem = async filter => {
        const {testId, studentId, msTimeStamp} = filter

        if (msTimeStamp) {
            const item = await dbAPI.getItem(
                "testResults",
                {userId: {S: studentId}, msTimeStamp: {S: msTimeStamp}}
            )
            return getResponse(item)
        } else {
            const list = await dbAPI.getItems("testResults", {
                expression: `userId = :studentId and testId = :testId`,
                values: {":studentId": {S: studentId}, ":testId": {N: testId}}
            })
            return list.map(item => getResponse(item)).reduce((newest, result) =>
                    (!newest || Number(newest.msTimeStamp) < Number(result.msTimeStamp)) ? result : newest,
                null
            )
        }
    }

    return {getList, getItem}
}

export const getProblemResultsDataSource: GetProblemResultsDataSource = dbAPI => {

    const getResponse = (item: DynamoProblemResultItem): ProblemResultData => ({
        msTimeStamp: item.msTimeStamp.S,
        problemId: Number(item.problemId.N),
        estimate: item.estimate ? Number(item.estimate.N): null,
        exerciseIndex: Number(item.exerciseIndex.N)
    })

    const getList: GetProblemResultsList = async filter => {
        const {studentId, msTestResultTimeStamp} = filter
        const list = await dbAPI.getItems("problemResults", {
            expression: `msTestResultTimeStamp = :msTestResultTimeStamp and userId = :studentId`,
            values: {":studentId": {S: studentId}, ":msTestResultTimeStamp": {S: msTestResultTimeStamp}}
        })
        return list.map(item => getResponse(item))
    }

    const getItem: GetProblemResultItem = async filter => {
        const {studentId, problemId} = filter
        const list = await dbAPI.getItems("problemResults", {
            expression: `userId = :studentId  and problemId = :problemId`,
            values: {":studentId": {S: studentId}, ":problemId": {N: String(problemId)}}
        })
        return list.map(item => getResponse(item)).reduce((newest, result) =>
                (!newest || Number(newest.msTimeStamp) < Number(result.msTimeStamp)) ? result : newest,
            null
        )
    }

    return {getList, getItem}
}