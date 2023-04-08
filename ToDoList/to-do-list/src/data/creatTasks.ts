import { connection } from "../index";

export default async function createTask (
    id: string,
    title: string,
    description: string,
    deadline: string,
    creatorUserId: string
){
    await connection('to_do_list_tasks')
    .insert({
        id: id, 
        title: title,
        description: description,
        deadline: deadline,
        author_id: creatorUserId
    })
}