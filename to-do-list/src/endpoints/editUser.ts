import {Request, Response} from "express"
import editUsers from "../data/editUsers"

export default async function editUser(
    req: Request,
    res: Response
){
    try {

        if(
            req.body.name === "" || req.body.nickname === "" || req.body.email === ""
        ){
            res.status(400).send({
                message: "Você precisa preencher todos os campos!"
            })

            return
        }

        if(
            !req.body.name && !req.body.nickname && !req.body.email
        ) {
            res.status(400).send({
                message: "Você precisa editar ao menos um dos campos!"
            })

            return
        }

        await editUsers(
            req.params.id,
            req.body.name,
            req.body.nickname,
            req.body.email
        )

        res.status(200).send({
            message: "Usuário alterado com sucesso!"
        })

        

    } catch (error:any) {
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    }
}