import type {UserAPI} from "apolloSubgraphHandler";
import type {UsersDataSource} from "User";
import type {DynamoNumber, DynamoString} from "dynamoDBAPI";

export type GetDataSource = (dbAPI: DbAPI) => TestResultsDataSource

export interface DbAPI {
    getItems: (tableName: TableName, filter: Filter) => Promise<any>,
    getItem: (tableName: TableName, key: any) => Promise<any>,
    putItem: (tableName: TableName, item: any) => Promise<void>,
    updateItem: (tableName: TableName, key: any, attributeUpdates: any) => Promise<void>
}

type TableName = "testResults" | "problems" | "tests" | "problemResults"
type Filter = {
    expression:
        "testId = :testId and userId = :userId" | "userId = :userId" |
        "msTestResultTimeStamp = :msTestResultTimeStamp and userId = :userId",
    values: any
}

export interface TestResultItem {
    msTimeStamp: DynamoString,
    userId: DynamoString,
    testId: DynamoNumber,
    finishedTimeStamp?: DynamoNumber
    percentage: DynamoNumber
}

export interface ProblemResultItem {
    estimate?: DynamoNumber,
    msTimeStamp: DynamoString,
    msTestResultTimeStamp: DynamoString,
    userId: DynamoString,
    problemId: DynamoNumber,
    answer?: DynamoString
    exerciseIndex: DynamoNumber
}

export interface Context {
    dataSource: DataSource,
    userAPI: UserAPI
}

type DataSource = {
    results: TestResultsDataSource,
    users: UsersDataSource
}

export interface TestResultsDataSource {
    getTestResult: GetTestResult,
    getTestResults: GetTestResults,
    addProblemResult: AddProblemResult,
    addTestResult: AddTestResult,
    updateTestResult: UpdateTestResult,
    updateProblemResult: UpdateProblemResult,
    getTest: GetTest,
    getProblem: GetProblem,
    getProblemResults: GetProblemResults,
    getProblemResult: GetProblemResult
}

export type GetTestResults = (filter: TestResultsFilter) => Promise<TestResult[]>
export type AddProblemResult = (data: ProblemResult) => Promise<void>
export type AddTestResult = (data: TestResult) => Promise<void>
export type UpdateTestResult = (filter: TestResultKey, data: UpdateTestResultData) => Promise<void>
export type UpdateProblemResult = (filter: ProblemResultFilter, data: UpdateProblemResultData) => Promise<void>
export type GetTest = (id: number) => Promise<Test>
export type GetProblem = (id: number) => Promise<Problem>
export type GetProblemResults = (filter: GetProblemResultsFilter) => Promise<ProblemResult[]>
export type GetTestResult = (key: TestResultKey) => Promise<TestResult>
export type GetProblemResult = (key: ProblemResultKey) => Promise<ProblemResult>

export interface TestParent {
    id?: TestId
}

export interface GetProblemResultsParent {
    userId?: UserId,
    msTimeStamp?: MsTimeStamp
}

export interface GetTestResultsArgs {
    studentId?: UserId
}

export interface GetProblemResultsArgs {
    studentId?: UserId | null,
    msTestResultTimeStamp?: MsTimeStamp
}

export interface WriteArgs {
    answer: string | null,
    testId: TestId,
    msTestResultTimeStamp: MsTimeStamp | null,
    problemId: number
    exerciseIndex: number
}

export interface UpdateArgs {
    studentId: UserId,
    msProblemResultTimeStamp: MsTimeStamp,
    estimate: number
}

export interface GetTestResultArgs {
    studentId?: UserId | null | void,
    msTimeStamp: MsTimeStamp
}

export interface WriteResponse {
    testResult: TestResult,
    problemResult: ProblemResult
}

export interface UpdateResponse {
    success: boolean
}

export interface TestResult {
    msTimeStamp: MsTimeStamp,
    userId: UserId,
    testId: string,
    finishedTimeStamp: number | null
    percentage: number
}

export interface ProblemResult {
    estimate: number | null,
    msTimeStamp: MsTimeStamp,
    msTestResultTimeStamp: MsTimeStamp,
    problemId: string,
    exerciseIndex: number
    userId: UserId,
    answer: string | null
}

interface Test {
    exercises: Exercise[]
}

interface Exercise {
    maxEstimate: number
}

interface Problem {
    answer: string | null
}

export interface TestResultKey {
    msTimeStamp: MsTimeStamp,
    userId: UserId
}
export interface ProblemResultKey {
    msTimeStamp: MsTimeStamp,
    userId: UserId
}

interface TestResultsFilter {
    userId: UserId,
    testId?: TestId
}

export interface ProblemResultFilter {
    userId: UserId
    msTimeStamp: MsTimeStamp
}

interface GetProblemResultsFilter {
    msTestResultTimeStamp: MsTimeStamp,
    userId: UserId
}

interface UpdateTestResultData {
    finishedTimeStamp?: number | null,
    percentage: number
}

interface UpdateProblemResultData {
    estimate: number
}

export type EventName = "NEXT" | "PREV" | "CONFIRM"
type TestId = number
type MsTimeStamp = string
type UserId = string