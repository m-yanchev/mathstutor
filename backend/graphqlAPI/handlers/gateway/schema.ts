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

scalar join__FieldSet

enum join__Graph {
  APPOINTMENT @join__graph(name: "appointment" url: "https://dev.mathstutor.ru/appointment")
  COURSE @join__graph(name: "course" url: "https://dev.mathstutor.ru/course")
  LESSON @join__graph(name: "lesson" url: "https://dev.mathstutor.ru/lesson")
  PROFILE @join__graph(name: "profile" url: "https://dev.mathstutor.ru/profile")
  TEST @join__graph(name: "test" url: "https://dev.mathstutor.ru/test")
  TESTRESULT @join__graph(name: "testResult" url: "https://dev.mathstutor.ru/test-result")
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
}

type Test
  @join__owner(graph: TEST)
  @join__type(graph: TEST, key: "id")
  @join__type(graph: TESTRESULT, key: "id")
{
  id: ID! @join__field(graph: TEST)
  results: [TestResult!]! @join__field(graph: TESTRESULT)
}

type TestResult {
  percent: Int!
  timeStamp: Int!
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
`