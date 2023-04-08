import { connection } from "../index";

export default async function createUsers(
    id: string,
    name: string,
    nickname: string,
    email: string
) {
    await connection.insert({
        id: id,
        name: name,
        nickname: nickname,
        email: email
    }).into('to_do_list_users')
}