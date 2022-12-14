import express, {Request, Response} from "express"
import {userAccounts} from "./data"
import {idGenerator} from "./idGenerator"

import cors from 'cors'
import { User } from "./type"

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
        const id = req.params.id
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
    const id = idGenerator()

    try {
        const {name, CPF, birthDate} = req.body

    //Validação de idade do usuario
        const today = new Date()
        const birthDateUser = new Date(birthDate)
        let age = today.getFullYear() - birthDateUser.getFullYear()
        const month = today.getMonth() - birthDateUser.getMonth()

        if(month < 0 || (month === 0 && today.getDate() < birthDateUser.getDate())){
            age--
        } 

        if(age < 18){
            errorCode = 403
            throw new Error("Usuário não pode ser menor de idade")
        }
        
        
        if(name.length < 3){
            errorCode = 422
            throw new Error("Nome deve ter no mínimo 3 caracteres")
        }
        if(!name || !CPF || !birthDate){
            errorCode= 422;
            throw new Error("Precisa informar: Nome, CPF  e data nascimento")
        }
        if(CPF.length !== 11){
            errorCode= 422;
            throw new Error("CPF precisa ter 11 digitos")
        }
        if(birthDate.length !== 10){
            errorCode= 422;
            throw new Error("Data de nascimento precisa ter 10 digitos")
        }

        const newUser:User = {
            id: id,
            name,
            CPF,
            birthDate,
            balance: 0,
            extract: [],

        }

        userAccounts.push(newUser)

        res.status(200).send("Usuário cadastrado com sucesso")

        
    } catch (error:any) {
        res.status(errorCode).send(error.message)
    }
})

//Requisição get para buscar saldo de um usuario
 app.get("/users/balance", (req:Request, res: Response) =>{
    //Varciavel Error
    let errorCode = 400;
    //Variavel body
    const body = req.body
    //Try -Catch
    const checkParameters = !body.name ||!body.CPF 

    try {
        //Verificação se os dados passados são iguais ao mockDados, atraves do filter, se apenas mapear depois
        const checkUser = userAccounts.filter((user)=>{
            return user.name === body.name && user.CPF === body.CPF
        })
        //Verificar se os campos forma passados
        if(checkParameters){
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
            throw new Error("Os campos: name, CPF e balance estão errados, corrija-os")
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