import { connection } from "..";

export const getUserId = async (id:string):Promise<any> => {
    const result = await connection.raw(`
        SELECT nickname FROM users  WHERE id = "${id}"
    `);
    return result[0][0];
}