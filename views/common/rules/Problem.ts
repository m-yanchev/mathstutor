import {Illus, IllusData} from "./Illus";
import {Solution, SolutionData} from "./Solution";

export interface ProblemData {
    id: number
    commonDesc: string | null
    desc: string
    illus: IllusData | null
    solution: SolutionData | null
    answer: string | null
}

export class Problem {

    id: number
    commonDesc: string | null
    desc: string
    illus: Illus | null
    solution: Solution | null
    answer: string | null

    constructor(data: ProblemData) {
        this.id = data.id
        this.commonDesc = data.commonDesc
        this.desc = data.desc
        this.answer = data.answer || null
        this.illus = Illus.create(data.illus, {problemId: data.id, useCase: "problem"})
        this.solution = Solution.create(data.solution, {problemId: data.id})
    }
}