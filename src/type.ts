export type extract = {
    value: number,
    date: string,
    description: string
}

export type User ={
    name: string,
    CPF: string,
    birthDate: string,
    balance:number,
    extract: extract[]
}