import express from "express";
import router from "./router";
import db from "./config/db";
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from "./config/swagger";

//conectarnos a la db
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log('Conexion exitosa a la db')
    } catch (error) {
        // console.log(error)
        console.log('Hubi un error en la db')
    }
}

connectDB()

//instancia de express
const server = express()

//permitir cors
const corsOptions : CorsOptions = {
    origin: function(origen, callback) {
        if (origen === process.env.FRONTED_URL) {
            console.log(origen)
            console.log(process.env.FRONTED_URL)
            callback(null, true)
        }else{
            callback(new Error('Error de CORS'))
        }
    }
}
server.use(cors(corsOptions))

//Leer datos de formulario / body
server.use(express.json())

// server.use(morgan('dev'))

server.use('/api/products', router)

// server.get('/api', (req, res) => {
//     res.json({msg: 'Desde API'})
// })


//Docs Swagger
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec) )


export default server