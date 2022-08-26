    import {Request, Response} from 'express'
    import { connection } from '..'

export default async function CreateUser (req:Request, res:Response) {
    try {
        const {id, nickname, email} = req.body

        if(!id || !nickname || !email){
            res.statusCode = 400
            throw new Error("Preencha todos os campos")
        }


        const insertUser = await connection.raw(`
        INSERT INTO users (id, nickname, email)
        VALUES ("${id}", "${nickname}", "${email}")
        
        `)

        res.status(201).send(`O usuario ${nickname} foi criado`)

        
    } catch (error:any) {
        res.status(res.statusCode || 500).send({message: error.message})
    }
}