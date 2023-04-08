export type transaction = {
    value: number,
    date: Date,
    description: string
}

export type account = {
    name: string,
    CPF: string,
    dateOFBirth: string,
    balance: number,
    statement: Array <transaction>
}