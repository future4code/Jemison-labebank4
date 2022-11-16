export type extract = {
    value: number,
    date: string,
    description: string
}

export type User ={
    id: string,
    name: string,
    CPF: string,
    birthDate: string,
    balance:number,
    extract: extract[]
}