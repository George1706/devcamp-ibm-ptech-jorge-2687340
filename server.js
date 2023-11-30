//Dependencias del proyecto
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
//Dependecia de BD
const conectarDB = require("./config/db")
//Traer las dependencias y definir las dependencias de rutas
const bootcampsRoutes = require('./routes/bootcampRoutes')
const coursesRoutes = require('./routes/courseRoutes')
const reviewsRoutes = require('./routes/reviewRoutes')
const userRoutes = require('./routes/userRoutes')

//CUANDO SON DEPENDENCIAS DEL PROYECTO DEBE SER CON ./ ejm ./config/db"

//Configurar dotenv
dotenv.config({
    path: "./config/.env"
})     

//Conexión a bd
conectarDB()

//Crear el objeto de app
//express
const app = express()

//Habilitar express para recibir body en formato jsom
app.use(express.json())

//Establecer rutas del proyecto
app.use('/api/v1/bootcamps',bootcampsRoutes)

app.use('/api/v1/courses',coursesRoutes)

app.use('/api/v1/reviews',reviewsRoutes)

app.use('/api/v1/auth',userRoutes)

//Crear el servidor de aplicaciones
//Aplicaciones express
app.listen( process.env.PUERTO, 
    () => {
        console.log(`Servidor express ejecutando ${ process.env.PUERTO } `.bgGreen.white.underline)
    } 
    )