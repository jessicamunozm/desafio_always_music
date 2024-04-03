import pkg from "pg";
const { Pool } = pkg;
import "dotenv/config";

const {DB_PASSWORD, DB_USER, DB_HOST, DB_NAME} = process.env

const config = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    allowExitOnIdle: true
}  

const db = new Pool(config)

//función para probar si está funcionando: está funcionando ok
// const client = await db.connect()
// await client.query('SELECT NOW()')
// console.log(client)
// client.release()

//1. Crear una función asíncrona para registrar un nuevo estudiante en la base de datos.
const insertStudents = async () => {
    const students = [
        ["Brian May", "123456789", "guitarra", "7"],
        ["Rosa Rojas", "147852369", "ukelele", "2"],
        ["Juan Perez", "987654321", "piano", "5"],
        ["Slash", "369852147", "guitarra", "100"]
    ];
//Ciclo for para ir iterando el ingreso de cada estudiante
//Para agregar más estudiantes hay que borrar los ya ingresados porque rut está como UNIQUE
    for (const student of students) {
        const consulta = "INSERT INTO students (Nombre, Rut, Curso, Nivel) VALUES ($1, $2, $3, $4)";
        const resp = await db.query(consulta, student)
        console.log(resp)
    }
};
//funcionando ok
// insertStudents();

//2. Crear una función asíncrona para obtener por consola el registro de un estudiante por medio de su rut.
const getStudent = async () => {
    const consulta = "SELECT * FROM students WHERE Rut = $1"
    const rut = "123456789"
    const resp = await db.query(consulta, [rut]);
    console.log(resp.rows)
}
//funcionando ok
// getStudent();

//3. Crear una función asíncrona para obtener por consola todos los estudiantes registrados.
const getAllStudents = async () => {
    const consulta = "select * from students"
    const resp = await db.query(consulta)
    console.log(resp.rows)
}
//funcionando ok
//getAllStudents();

//4. Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos.
const updateStudent = async () => {
    const consulta = "update students set nombre = 'Pedro Gomez' WHERE id = 1";
    const resp = await db.query(consulta);
    console.log(resp);
    console.log('Estudiante actualizado');
}
//funcionando ok
// updateStudent();

//5. Crear una función asíncrona para eliminar el registro de un estudiante de la base de datos.
const deleteStudent = async () => {
    const consulta = "delete from students WHERE id = 1";
    const resp = await db.query(consulta);
    console.log(resp);
    console.log('Estudiante eliminado');
}
//funcionando ok
deleteStudent();