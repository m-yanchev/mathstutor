import {Context, Problem, ProblemParent, ProblemsParent} from "./problems";

const problem = (parent: ProblemParent, _, context: Context): Promise<Problem> => {
    const {dataSource} = context
    const {problemId} = parent
    const {problems} = dataSource
    const {get} = problems
    return get({id: problemId})
}

const problems = (parent: ProblemsParent, _, context: Context): Promise<Problem[]> => {
    const {dataSource} = context
    const {exampleIdList} = parent
    const {problems} = dataSource
    const {get} = problems
    return Promise.all(exampleIdList.map(id => get({id})))
}

export const resolvers = {
    Exercise: {
        problem
    },
    ProblemResult: {
        problem
    },
    Lesson: {
        examples: problems
    }
}