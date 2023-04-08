import {Request, Response} from "express"
import moment from "moment"
import createTasks from "../data/creatTasks"

export default async function createTask(
    req: Request,
    res: Response
){
    try {

        if(
            !req.body.title || !req.body.description || !req.body.deadline || !req.body.creatorUserId){
                throw new Error ("Você deve preencher todos os campos!")
            } 

        const dateDiff: number = moment(req.body.deadline, "DD/MM/YYYY").unix() - moment().unix()

        if(dateDiff <= 0){
            throw new Error ("O prazo da tarefa deve ser uma data futura")   
        }

        const id = Date.now().toString()

        await createTasks(
            id, 
            req.body.title,
            req.body.description,
            moment(req.body.deadline, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            req.body.creatorUserId
        )

        return res.status(200).send(`Tarefa criada. Seu id é ${id}.`)

        
    } catch (error:any) {
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    }
}