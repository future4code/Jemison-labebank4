import {User,extract} from "./type"
import {idGenerator} from "./idGenerator"


// const id = String(new Date().getTime()) - Teste



export const userAccounts:User[] = [
    {
        id: idGenerator(),
        name: "Daniel Sousa",
        CPF: "121235686525",
        birthDate:"06-09-1999",
        balance:10000000,
        extract:[
            {value:5000 , date:'20-05-2000' , description: "SSD para o Pc" }
        ]
    },
    {
        id: idGenerator(),
        name: "Douglas Silva",
        CPF: "121235686525",
        birthDate:"06-01-1650",
        balance:500000,
        extract:[
            {value:5000 , date:'20-05-2000' , description: "Fone novo" }
        ]
    },
    {
        id: idGenerator(),
        name: "Matheus Sousa",
        CPF: "121235686525",
        birthDate:"06-09-1500",
        balance:15000000,
        extract:[
            {value:5000 , date:'20-05-1500' , description: "Compra de produtos para o barco, para a expedição no recente descobrimento do Brasil" }
        ]
    },

]