export function getIdParam(): number {
    return  Number(getParam("id"))
}

export function getIdStringParam(): string {
    return  getParam("id")
}

export function getParam(name: string): string {
    const queryString = document.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(name)
}