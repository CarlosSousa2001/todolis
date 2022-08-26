import  express from "express";
import cors from "cors";
import knex from 'knex';
import dotenv from 'dotenv';
import getUser from "./endpoints/PegarUser";
import CreateUser from "./endpoints/CriarUser";

dotenv.config()

export const connection = knex({
	client: "mysql",
	connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
  }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/teste", (request, response)=> {
    response.send("isso é um teste da api")
})

// criar usuario

app.post("/createUser", CreateUser )
  

// PEGAR USER PELO ID


app.get("/PegarUser/:id", getUser)
 

// Editar usuário

const updateActor = async (id:string, nickname:string , email:string): Promise<any> => {
    const result = await connection(
   "users"
    ).update ({nickname, email} ).where ("id", id)
    return await connection("users").select("*").where("id", id)
}

app.put("/user/edit/:id", async (req, res)=> {
    try {
        
        const idNickname = req.params.id
        const userNickname = req.body.nickname
        const userEmail:string = req.body.email
        
        if(!idNickname || !userNickname || !userEmail){
            res.statusCode = 400
            throw new Error("Preencha todos os campos")
        }

        res.send(await updateActor(idNickname, userNickname, userEmail))

    } catch (error:any) {
        res.status(res.statusCode || 500).send({message: error.message})
    }
})

//Criar tarefa

app.post("/task", async (req, res)=> {
    
    const {title, description, limiteDate, creatorUserId} = req.body

    const result = await connection.raw(`
        INSERT INTO tarefas (title,description, limiteDate, creatorUserId )
        VALUES ("${title}", "${description}", "${limiteDate}", "${creatorUserId}")
    `)
    res.status(201).send(`A tarefa ${title} foi criado`)
})


// Pegar tarefa

// const getTarefaId = async(id:string, title:string) => {
//     const result =  await connection.raw(`
//       SELECT title FROM tarefas WHERE id = "${id}"
//     `);

//     return result[0][0]
// }

// app.get("/task/:id", async (req, res)=> {

//     const taskId = req.params.id

//    res.send(await getTarefaId(taskId))

// })







app.listen(3003, ()=>{
    console.log("http://localhost:3003")
})