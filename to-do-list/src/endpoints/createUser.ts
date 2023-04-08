import {Request, Response} from "express"
import createUsers from "../data/createUsers"

export default async function createUser(
    req: Request,
    res: Response
){
    try {

        if(!req.body.name || !req.body.nickname || !req.body.email){
            throw new Error ("Você precisa enviar um nome, apelido e email!")
        }

        const id = Date.now().toString()

        await createUsers(
            id,
            req.body.name,
            req.body.nickname,
            req.body.email
        )

       return res.status(200).send("Usuário criado.")

    } catch (error:any) {
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    }
}