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
  @join__type(graph: LESSON, key: "lessonIdList")
{
  id: ID! @join__field(graph: COURSE)
  lessonIdList: [ID!]! @join__field(graph: COURSE)
  lessons: [Lesson!]! @join__field(graph: LESSON)
  title: String! @join__field(graph: COURSE)
}

type Exercise
  @join__owner(graph: TEST)
  @join__type(graph: TEST, key: "problemId")
  @join__type(graph: PROBLEM, key: "problemId")
{
  problem: Problem! @join__field(graph: PROBLEM)
  problemId: ID! @join__field(graph: TEST)
  withDetailedAnswer: Boolean @join__field(graph: TEST)
}

scalar join__FieldSet

enum join__Graph {
  APPOINTMENT @join__graph(name: "appointment" url: "https://api.mathstutor.ru/appointment")
  COURSE @join__graph(name: "course" url: "https://api.mathstutor.ru/course")
  LESSON @join__graph(name: "lesson" url: "https://api.mathstutor.ru/lesson")
  PROBLEM @join__graph(name: "problem" url: "https://api.mathstutor.ru/problem")
  PROFILE @join__graph(name: "profile" url: "https://api.mathstutor.ru/profile")
  TEST @join__graph(name: "test" url: "https://api.mathstutor.ru/test")
  TESTRESULT @join__graph(name: "testResult" url: "https://api.mathstutor.ru/test-result")
}

type Lesson
  @join__owner(graph: LESSON)
  @join__type(graph: LESSON, key: "finalTestId")
  @join__type(graph: TEST, key: "finalTestId")
{
  finalTest: Test @join__field(graph: TEST)
  finalTestId: ID @join__field(graph: LESSON)
  id: ID! @join__field(graph: LESSON)
  title: String! @join__field(graph: LESSON)
}

type Mutation {
  signUp(email: String!, name: String!, password: String!): ProfileResult! @join__field(graph: PROFILE)
  updateProfile(name: String!): ProfileResult! @join__field(graph: PROFILE)
  writeResult(answer: String!, msTestResultTimeStamp: String, problemId: String!, testId: ID!): WriteResultResponse! @join__field(graph: TESTRESULT)
}

type Problem {
  answer: String
  commonDesc: String
  desc: String!
  id: ID!
  imageAlt: String
}

type ProblemResult {
  msTestResultTimeStamp: String!
  msTimeStamp: String!
  percentage: Int!
  userId: String!
}

type Profile
  @join__owner(graph: PROFILE)
  @join__type(graph: PROFILE, key: "appointmentId")
  @join__type(graph: APPOINTMENT, key: "appointmentId")
{
  appointment: Appointment @join__field(graph: APPOINTMENT)
  appointmentId: ID @join__field(graph: PROFILE)
  email: String! @join__field(graph: PROFILE)
  emailConfirmed: Boolean @join__field(graph: PROFILE)
  name: String! @join__field(graph: PROFILE)
}

enum ProfileError {
  email_already_exists
}

type ProfileResult {
  error: ProfileError
  ok: Boolean!
}

type Query {
  lesson(id: ID!): Lesson @join__field(graph: LESSON)
  profile: Profile @join__field(graph: PROFILE)
  test(id: ID!): Test @join__field(graph: TEST)
}

type Test
  @join__owner(graph: TEST)
  @join__type(graph: TEST, key: "id")
  @join__type(graph: TESTRESULT, key: "id")
{
  exercises: [Exercise!]! @join__field(graph: TEST)
  id: ID! @join__field(graph: TEST)
  results: [TestResult!]! @join__field(graph: TESTRESULT)
}

type TestResult {
  finishedTimeStamp: Int
  msTimeStamp: String!
  percentage: Int!
  testId: Int!
  userId: String!
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

type WriteResultResponse {
  problemResult: ProblemResult
  testResult: TestResult
}
`