import {Request, Response} from "express"
import moment from "moment"
import selectTasksById from "../data/selectTasksById"


export default async function selectTaskById(
    req: Request,
    res: Response
){
    try {

        const result = await selectTasksById(req.params.id)

        if(!result){
            throw new Error ("Tarefa não encontrada!")
        }

        return res.status(200).send({
            id: result.id,
            title: result.title,
            descripition: result.descripition,
            deadline: moment(result.deadline, "YYYY-MM-DD").format("DD/MM/YYYY"),
            status: result.status,
            authorId: result.author_id ,
            authorNickname: result.nickname
        })


    } catch (error:any) {
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    }
}