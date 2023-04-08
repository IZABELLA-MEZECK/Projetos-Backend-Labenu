import express, {Express, Request, Response} from "express"
import cors from "cors"
import { accounts } from "./accounts"
import { account } from "./types"

const app: Express = express ()

app.use(express.json())
app.use(cors())

app.post("/accounts", (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const {name, CPF, dateOFBirth} = req.body

        const [day, month, year] = dateOFBirth.split("/") 

        const dateOfBirth: Date = new Date(`${year}-${month}-${day}`)

        // validar as entradas da requisição

        const ageInMilisseconds: number = Date.now() - dateOfBirth.getTime()

        const ageInYears: number = ageInMilisseconds / 1000 / 60 / 60 / 24 / 365

        if(ageInYears < 18) {
            res.statusCode = 406
            throw new Error("Idade deve ser maior que 18 anos.")
        }

        for(const account of accounts){
            if(account.CPF === CPF)
            throw new Error ("CPF já cadastrado"!)
        }

        // consultar ou alterar a base de dados
        accounts.push({
            name,
            CPF,
            dateOFBirth,
            balance: 0,
            statement: []
        })
        // validar os resultados da consulta
        
        // enviar a resposta
        res.status(201).send("Conta criada com sucesso!")

    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }
})

app.get("/accounts", (req: Request, res: Response) => {
    let errorCode = 400
    try {
        res.status(201).send(accounts)
    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }
})

app.get("/CPF/accounts", (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const CPF = req.query.CPF 

        const account: account | undefined = accounts.find((account) => {    
            if (account.CPF === CPF)
            return res.send (`Saldo R$: ${account.balance}`)})

        if(!account) {
            errorCode = 404
            throw new Error ("Conta não encontrada!")
        }
    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }
})

app.put("/accounts/balance", (req: Request, res: Response) => {
    let errorCode = 400
    try {
        const name: string = req.body
        const CPF: string = req.body
        const transactionAmount: number = req.body

        if(!name) {
            errorCode = 422
            throw new Error ("Digite um nome válido")
        }
        if(!CPF) {
            errorCode = 422
            throw new Error ("Digite um CPF válido")
        }
        if(!transactionAmount) {
            errorCode = 422
            throw new Error ("Digite um valor válido")
        }

        const account = accounts.find((account) => {
            return name === account.name && CPF === account.CPF
        })
        
        if (!account) {
            errorCode = 404
            throw new Error ("Usuario não encontrado")
        }
        
        const newBalance = account.balance + transactionAmount

        console.log (newBalance)

        res.status(201).send(`O seu saldo atual é de R$ ${newBalance}`)
            
    } catch (error: any) {
        res.status(errorCode).send(error.message)
    }

})




app.listen(3003, () => {
    console.log("Server is running in http://localhost:3003")
})

