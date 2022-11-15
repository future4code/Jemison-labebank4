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


//Requisição get para buscar saldo de um usuario
 app.get("/users/balance", (req:Request, res: Response) =>{
    //Varciavel Error
    let errorCode = 400;
    //Variavel body
    const body = req.body
    //Try -Catch
    try {
        //Verificação se os dados passados são iguais ao mockDados, atraves do filter, se apenas mapear depois
        const checkUser = userAccounts.filter((user)=>{
            return user.name === body.name && user.CPF === body.CPF
        })
        //Verificar se os campos forma passados
        if(!body.name || !body.CPF){
            errorCode = 400
            throw new Error("Os campos CPF e name estão incorretos")
        }
        //Se a checagem de usuario for false, então podemos dizer que é igual a "0", se sim então temos um erro
        if(checkUser.length === 0){
            errorCode = 404;
            throw new Error("Usuario não encontraso")
        }else{
            //Se tudo for ok, mostramos o saldo
            const balanceUser = checkUser.map((user)=>{
                return user.balance
            })

            res.status(200).send(balanceUser)
        }
    }catch(error: any){
        res.status(errorCode).send(error.message)
    }
}) 







//Servidor
app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003");
});