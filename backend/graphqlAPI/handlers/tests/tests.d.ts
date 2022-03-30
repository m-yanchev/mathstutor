import {UsersDataSource} from "User";
import {DynamoNumber, DynamoString} from "dynamoDBAPI";
import {UserAPI} from "apolloSubgraphHandler";

export interface GetTestParent {
    finalTestId?: TestId
    testId?: TestId
    msTimeStamp?: MsTimeStamp
    userId?: UserId
}
export interface TestFetchOptions {
    studentId: UserId
    msTestResultTimeStamp: MsTimeStamp | void
    dataSource: DataSource
}
export interface TestResult {
    problemResults: ProblemResultData[]
}
export interface ProblemResult {
    problemId: ProblemId
}

export interface DataSource {
    tests: TestsDataSource,
    testResults: TestResultsDataSource,
    problemResults: ProblemResultsDataSource,
    users: UsersDataSource
}

export type GetTestsDataSource = (dbAPI: DbAPI) => TestsDataSource
export type GetTestResultsDataSource = (dbAPI: DbAPI) => TestResultsDataSource
export type GetProblemResultsDataSource = (dbAPI: DbAPI) => ProblemResultsDataSource

export interface TestsDataSource {
    getItem: GetTestsItem
}
export interface TestResultsDataSource {
    getList: GetTestResultsList
    getItem: GetTestResultsItem
}
export interface ProblemResultsDataSource {
    getList: GetProblemResultsList
    getItem: GetProblemResultItem
}

type DbAPI = {
    getItem: (tableName: TableName, key: any) => Promise<any>
    getItems: (tableName: TableName, filter: any) => Promise<any>
}

export type GetTestsItem = (filter: GetTestFilter) => Promise<TestData>
export type GetTestResultsList = (filter: GetTestResultsFilter) => Promise<TestResultData[]>
export type GetTestResultsItem = (filter: GetTestResultFilter) => Promise<TestResultData | null>
export type GetProblemResultsList = (filter: GetProblemResultsFilter) => Promise<ProblemResultData[]>
export type GetProblemResultItem = (filter: GetProblemResultFilter) => Promise<ProblemResultData | null>

type TableName = "testResults" | "tests" | "problemResults"

export interface DynamoTestResultItem {
    msTimeStamp: DynamoString
    finishedTimeStamp?: DynamoNumber
}
export interface DynamoProblemResultItem {
    msTimeStamp: DynamoString
    problemId: DynamoNumber
    estimate: DynamoNumber | null
    exerciseIndex: DynamoNumber
}

export interface GetTestFilter {
    id: TestId
}
export interface TestData {
    id: TestId
    title: string
    exercises: ExerciseData[]
}
export interface GetTestResultsFilter {
    studentId: UserId
}
export interface GetTestResultFilter {
    testId: TestId
    studentId: UserId
    msTimeStamp?: MsTimeStamp | void
}
export interface TestResultData {
    msTimeStamp: MsTimeStamp
    isFinished: boolean
}
export interface GetProblemResultsFilter {
    studentId: UserId
    msTestResultTimeStamp: MsTimeStamp
}
export interface GetProblemResultFilter {
    studentId: UserId
    problemId: ProblemId
}
export interface ProblemResultData {
    msTimeStamp: MsTimeStamp
    problemId: ProblemId
    estimate: number | null
    exerciseIndex: number
}

export interface Test {
    id: TestId
    title: string
    msNotFinishedResultTimeStamp: string | null
    completedLength: number
    state: TestState
    exercises: Exercise[]
}
export type TestState = "NEW" | "NOT_CHECKED" | "NOT_FINISHED" | "CHECKED"
export interface TestResponse {
    id?: TestIdResponse
    title?: string
    msNotFinishedResultTimeStamp?: string | null
    completedLength?: number
    state?: TestState
    exercises?: ExerciseResponse[]
}
export type ExerciseData = {
    problemIdList: ProblemIdList,
    withDetailedAnswer: boolean,
    maxEstimate: number
}
type Exercise = {
    problemId: ProblemId
    withDetailedAnswer: boolean
    maxEstimate: number
}
type ExerciseResponse = {
    problemId?: ProblemIdResponse
    withDetailedAnswer?: boolean
    maxEstimate?: number
}
export interface GetTestArgs {
    id?: number
}
export interface Context {
    dataSource: DataSource
    userAPI: UserAPI
}
export interface Info {
    fieldName: string
}
export type ProblemIdList = ProblemId[]
type ProblemId = number
type ProblemIdResponse = string
export type TestId = number
type TestIdResponse = string
type UserId = string
type MsTimeStamp = string