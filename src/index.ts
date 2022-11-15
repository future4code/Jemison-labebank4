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


//Requisição put Adicionar saldo 

app.put("/users/addNewBalance", (req: Request, res: Response) =>{
    let errorCode = 400;
    const body = req.body
    const checkParameters = !body.name ||!body.CPF || !body.balance

    //Try -Catch
    try {
        const checkUser = userAccounts.filter((user)=>{
            return user.name === body.name && user.CPF === body.CPF
        })

        if(checkParameters){
            errorCode = 400;
            throw new Error("Os campos: name, CPF e value estão errados, corrija-os")
        }else if(typeof body.balance !== 'number'){
            errorCode = 400;
            throw new Error("A propriedade balance não é um number")
        }




        if(checkUser.length === 0){
            errorCode = 404;
            throw new Error("Usuario não encontrado")
        }else{
            checkUser[0].balance += body.balance
        }
        res.status(200).send(checkUser)
       
    }catch(error: any){
        res.status(errorCode).send(error.message)
    }

})



//Servidor
app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003");
});