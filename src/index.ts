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


app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003");
});