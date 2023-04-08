import express, {Express, Request, Response} from 'express'
import cors from "cors"
import knex from 'knex'
import dotenv from 'dotenv'
import createUser from './endpoints/createUser'
import selectUserById from './endpoints/selectUserById'
import editUser from './endpoints/editUser'
import createTask from './endpoints/createTask'
import selectTaksById from './endpoints/selectTaskById'

dotenv.config() 

export const connection = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: 3306,
        multipleStatements: true
    }
})

const app = express ()
app.use(express.json())
app.use(cors());

app.post('/user', createUser)

app.get('/user/:id', selectUserById)

app.put('/user/edit/:id', editUser)

app.post('/task', createTask)

app.get('/task/:id', selectTaksById)




app.listen(3003, ()=> {
    console.log('Servidor rodando na porta 3003.')
})

