import {Request, Response} from "express"
import selectUsersById from "../data/selectUsersById"

export default async function selectUserById(
    req: Request,
    res: Response
){
    try {

        const user = await selectUsersById(req.params.id)

        if(!user) {
           res.status(404).send({
            message: "Usuário não encontrado no banco de dados."
           }) 

           return
        }

        res.status(200).send({
            id: user.id,
            nickname: user.nickname
        })

    } catch (error:any) {
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    }
}