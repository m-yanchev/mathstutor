declare function ym(key: number, type: "reachGoal", targetName: string): void

export function yandexMetrica({key, targetName}) {
    if (process.env.NODE_ENV === "production") ym(key,'reachGoal',targetName)
}