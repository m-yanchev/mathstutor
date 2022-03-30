import {Illus, IllusData} from "./Illus";

export interface SolutionData {
    desc: string
    illus: IllusData | null
}

interface SolutionOptions {
    problemId: number
}

export class Solution {

    desc: string
    illus: Illus | null

    constructor(data: SolutionData, options: SolutionOptions) {
        this.desc = data.desc
        this.illus = Illus.create(data.illus, {problemId: options.problemId, useCase: "solution"})
    }

    static create(data: SolutionData | null, options: SolutionOptions): Solution | null {
        return data ? new Solution(data, options) : null
    }
}