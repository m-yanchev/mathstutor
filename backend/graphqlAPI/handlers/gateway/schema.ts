export const supergraphSdl = `
schema
  @core(feature: "https://specs.apollo.dev/core/v0.1"),
  @core(feature: "https://specs.apollo.dev/join/v0.1")
{
  query: Query
  mutation: Mutation
}

directive @core(feature: String!) repeatable on SCHEMA

directive @join__field(graph: join__Graph, requires: join__FieldSet, provides: join__FieldSet) on FIELD_DEFINITION

directive @join__type(graph: join__Graph!, key: join__FieldSet) repeatable on OBJECT | INTERFACE

directive @join__owner(graph: join__Graph!) on OBJECT | INTERFACE

directive @join__graph(name: String!, url: String!) on ENUM_VALUE

enum Access {
  student
  tutor
}

type Appointment
  @join__owner(graph: APPOINTMENT)
  @join__type(graph: APPOINTMENT, key: "courseId")
  @join__type(graph: COURSE, key: "courseId")
{
  course: Course! @join__field(graph: COURSE)
  courseId: ID! @join__field(graph: APPOINTMENT)
  id: ID! @join__field(graph: APPOINTMENT)
  startTimeStamp: Int! @join__field(graph: APPOINTMENT)
  vacations: [Vacations!] @join__field(graph: APPOINTMENT)
  weekDays: [WeekDay!]! @join__field(graph: APPOINTMENT)
}

type Course
  @join__owner(graph: COURSE)
  @join__type(graph: COURSE, key: "lessonIdList")
  @join__type(graph: LESSONS, key: "lessonIdList")
{
  id: ID! @join__field(graph: COURSE)
  lessonIdList: [ID!]! @join__field(graph: COURSE)
  lessons: [Lesson!]! @join__field(graph: LESSONS)
  title: String! @join__field(graph: COURSE)
}

type Exercise
  @join__owner(graph: TESTS)
  @join__type(graph: TESTS, key: "problemId")
  @join__type(graph: PROBLEMS, key: "problemId")
{
  maxEstimate: Int! @join__field(graph: TESTS)
  problem: Problem! @join__field(graph: PROBLEMS)
  problemId: ID! @join__field(graph: TESTS)
  withDetailedAnswer: Boolean @join__field(graph: TESTS)
}

type Illus {
  name: String
}

scalar join__FieldSet

enum join__Graph {
  APPOINTMENT @join__graph(name: "appointment" url: "https://api.mathstutor.ru/appointment")
  COURSE @join__graph(name: "course" url: "https://api.mathstutor.ru/course")
  LESSONS @join__graph(name: "lessons" url: "https://api.mathstutor.ru/lessons")
  PROBLEMS @join__graph(name: "problems" url: "https://api.mathstutor.ru/problems")
  PROFILES @join__graph(name: "profiles" url: "https://api.mathstutor.ru/profiles")
  RESULTS @join__graph(name: "results" url: "https://api.mathstutor.ru/results")
  TESTS @join__graph(name: "tests" url: "https://api.mathstutor.ru/tests")
}

type Lesson
  @join__owner(graph: LESSONS)
  @join__type(graph: LESSONS, key: "finalTestId")
  @join__type(graph: LESSONS, key: "exampleIdList")
  @join__type(graph: PROBLEMS, key: "exampleIdList")
  @join__type(graph: TESTS, key: "finalTestId")
{
  exampleIdList: [ID!]! @join__field(graph: LESSONS)
  examples: [Problem!]! @join__field(graph: PROBLEMS)
  finalTest: Test @join__field(graph: TESTS)
  finalTestId: ID @join__field(graph: LESSONS)
  id: ID! @join__field(graph: LESSONS)
  isExamples: Boolean! @join__field(graph: LESSONS)
  title: String! @join__field(graph: LESSONS)
}

type Mutation {
  signUp(email: String!, name: String!, password: String!): ProfileResult! @join__field(graph: PROFILES)
  updatePassword(password: String!): ProfileResult! @join__field(graph: PROFILES)
  updateProfile(name: String!): ProfileResult! @join__field(graph: PROFILES)
  updateResult(estimate: Int!, msProblemResultTimeStamp: String!, studentId: ID!): UpdateResponse! @join__field(graph: RESULTS)
  writeResult(answer: String, exerciseIndex: Int!, msTestResultTimeStamp: String, problemId: ID!, testId: ID!): WriteResponse! @join__field(graph: RESULTS)
}

type Problem {
  answer: String
  commonDesc: String
  desc: String!
  id: ID!
  illus: Illus
  solution: Solution
}

type ProblemResult
  @join__owner(graph: RESULTS)
  @join__type(graph: RESULTS, key: "problemId")
  @join__type(graph: PROBLEMS, key: "problemId")
{
  answer: String @join__field(graph: RESULTS)
  estimate: Int @join__field(graph: RESULTS)
  exerciseIndex: Int! @join__field(graph: RESULTS)
  msTestResultTimeStamp: String! @join__field(graph: RESULTS)
  msTimeStamp: String! @join__field(graph: RESULTS)
  problem: Problem! @join__field(graph: PROBLEMS)
  problemId: ID! @join__field(graph: RESULTS)
  userId: ID! @join__field(graph: RESULTS)
}

type Profile
  @join__owner(graph: PROFILES)
  @join__type(graph: PROFILES, key: "appointmentId")
  @join__type(graph: APPOINTMENT, key: "appointmentId")
{
  access: Access @join__field(graph: PROFILES)
  appointment: Appointment @join__field(graph: APPOINTMENT)
  appointmentId: ID @join__field(graph: PROFILES)
  email: String! @join__field(graph: PROFILES)
  emailConfirmed: Boolean @join__field(graph: PROFILES)
  id: ID! @join__field(graph: PROFILES)
  name: String! @join__field(graph: PROFILES)
}

enum ProfileError {
  email_already_exists
}

type ProfileResult {
  error: ProfileError
  ok: Boolean!
}

type Query {
  lesson(id: ID!): Lesson @join__field(graph: LESSONS)
  problemResults(msTestResultTimeStamp: String!, studentId: ID): [ProblemResult!]! @join__field(graph: RESULTS)
  profile: Profile @join__field(graph: PROFILES)
  student(id: ID): Profile! @join__field(graph: PROFILES)
  students: [Profile!]! @join__field(graph: PROFILES)
  test(id: ID!): Test @join__field(graph: TESTS)
  testResult(msTimeStamp: String!, studentId: ID): TestResult! @join__field(graph: RESULTS)
  testResults(studentId: ID!): [TestResult!]! @join__field(graph: RESULTS)
}

type Solution {
  desc: String!
  illus: Illus
}

type Test
  @join__owner(graph: TESTS)
  @join__type(graph: TESTS, key: "id")
  @join__type(graph: RESULTS, key: "id")
{
  completedLength: Int! @join__field(graph: TESTS)
  exercises: [Exercise!]! @join__field(graph: TESTS)
  id: ID! @join__field(graph: TESTS)
  msNotFinishedResultTimeStamp: String @join__field(graph: TESTS)
  results(studentId: ID): [TestResult!] @join__field(graph: RESULTS)
  state: TestState! @join__field(graph: TESTS)
  title: String! @join__field(graph: TESTS)
}

type TestResult
  @join__owner(graph: RESULTS)
  @join__type(graph: RESULTS, key: "testId msTimeStamp userId")
  @join__type(graph: TESTS, key: "testId msTimeStamp userId")
{
  finishedTimeStamp: Int @join__field(graph: RESULTS)
  msTimeStamp: String! @join__field(graph: RESULTS)
  percentage: Int! @join__field(graph: RESULTS)
  problemResults: [ProblemResult!]! @join__field(graph: RESULTS)
  test: Test @join__field(graph: TESTS)
  testId: ID! @join__field(graph: RESULTS)
  userId: ID! @join__field(graph: RESULTS)
}

enum TestState {
  NEW
  NOT_CHECKED
  NOT_FINISHED
}

type UpdateResponse {
  success: Boolean!
}

type Vacations {
  finishTimeStamp: Int!
  startTimeStamp: Int!
}

type WeekDay {
  duration: Int
  hour: Int!
  minute: Int!
  number: Int!
}

type WriteResponse {
  problemResult: ProblemResult
  testResult: TestResult
}
`