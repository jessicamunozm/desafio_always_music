import pkg from "pg";
const { Pool } = pkg;
import "dotenv/config";

const {DB_PASSWORD, DB_USER, DB_HOST, DB_DATABASE} = process.env

const config = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
}  

//conexión con bdd checkeada
const pool = new Pool(config)

export default pool