import {Request, Response} from "express"
import { getUserId } from "../data/SelectUsers"

export default async function getUser (req:Request, res:Response) {
    try {
        
        let userId = req.params.id

        if(!userId){
            res.statusCode = 400
            throw new Error("Preencha todos os campos")
        }
        res.send( await getUserId(userId))

    } catch (error:any) {
        res.status(res.statusCode || 500).send({message: error.message})
    }

}
