import express, {Request, Response} from "express"
import {userAccounts} from "./data"

import cors from 'cors'

const app = express()

app.use(express.json())

app.use(cors())



//Requisição get para buscar todos os usuarios
app.get("/allUsers", (req:Request, res: Response) => {
    const allUsers = userAccounts.map((users) =>{
        return users
    })

    res.status(200).send(allUsers)
})












//Requisição get para buscar um usuario pelo id
app.get("/user/:id", (req:Request, res: Response) => {
    let errorCode: number = 400
    try {
        const id = Number(req.params.id)
        const user = userAccounts.find((users) => users.id === id)

        if(!user){
            errorCode = 404
            throw new Error("Usuário não encontrado, verifique o id")
        }

        res.status(200).send(user)
    } catch (error) {
        res.status(errorCode).send()
    }
})

//Requisição post para criar um novo usuario
app.post("/createUser", (req:Request, res: Response) => {
    let errorCode: number = 400
    try {
        const {id, name, CPF, birthDate, balance, extract} = req.body

        if(!id || !name || !CPF || !birthDate || !balance || !extract){
            errorCode = 422
            throw new Error("Verificar detalhes para cadastro")
        }

        const newUser = {
            id,
            name,
            CPF,
            birthDate,
            balance,
            extract
        }

        userAccounts.push(newUser)

        res.status(200).send("Usuário cadastrado com sucesso")
    } catch (error) {
        res.status(errorCode).send("Usário não cadastrado")
    }
})



app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003");
});