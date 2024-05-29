import pool from '../config/db.js'
//constante para eliminar las 2 primeras filas de process.argv que contiene rutas a db y a archivos
const argumentos = process.argv.slice(2)
const opcion = argumentos[0]
const nombre = argumentos[1]
let rut = argumentos[2]
const curso = argumentos[3]
const nivel = argumentos[4]

//1. Crear una función asíncrona para registrar un nuevo estudiante en la base de datos.
const addStudent = async (nombre, rut, curso, nivel) => {
    const consulta = "INSERT INTO students (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4)";
    const values = [nombre, rut, curso, nivel]    
    const respuesta = await pool.query(consulta, values)
        console.log('Estudiante registrado')
    }

//2. Crear una función asíncrona para obtener por consola el registro de un estudiante por medio de su rut.
const getStudent = async () => {
    const consulta = "SELECT * FROM students WHERE Rut = $1"
    const rut = "123456789"
    const respuesta = await pool.query(consulta, [rut]);
    console.log(respuesta.rows)
    console.log('Estudiante encontrado')
}

//3. Crear una función asíncrona para obtener por consola todos los estudiantes registrados.
const showStudents = async () => {
    const consulta = "select * from students"
    const respuesta = await pool.query(consulta)
    console.log(respuesta.rows)
}

//4. Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos.
const updateStudent = async (nombre, rut, curso, nivel) => {
    const consulta = "update students set nombre = $1, curso = $3, nivel = $4 WHERE rut = $2";
    const values = [nombre, rut, curso, nivel]
    const respuesta = await pool.query(consulta, values)
    console.log('Estudiante actualizado', respuesta.rows)
}

//5. Crear una función asíncrona para eliminar el registro de un estudiante de la base de datos.
const deleteStudent = async (rut) => {
    const consulta = "delete from students WHERE rut = $1";
    const values = [rut]
    const respuesta = await pool.query(consulta, values);
    console.log(`Estudiante rut:${rut} ha sido eliminado de la base de datos`);
}

const selectStudent = async (rut) => {  
    const consulta = "SELECT * FROM students WHERE rut = $1"
    const values = [rut]
    const respuesta = await pool.query(consulta, values)
    console.log(respuesta.rows)
}

if (opcion ===  'add') {
    addStudent(nombre, rut, curso, nivel)
} else if (opcion === 'get') {
    getStudent()
} else if (opcion === 'show') {
    showStudents()
} else if (opcion === 'update') {
    updateStudent(nombre, rut, curso, nivel)
} else if (opcion === 'delete') {
    rut = argumentos[1]
    deleteStudent(rut)
} else if (opcion === 'select') {
    rut = argumentos[1]
    selectStudent(rut)
} else {
    console.log('Función inválida')
}

