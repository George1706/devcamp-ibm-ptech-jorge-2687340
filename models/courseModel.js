const mongoose = require('mongoose')

//Definir el Schema
//Definir el plano general de todo courses
//El number se debe poner en MAYUSCULA Number

const coursesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [ true, "Titulo requerido" ],
        maxlength: [ 30 , "Titulo muy largo"],
        minlength: [ 10 , "Titulo muy corto"]
    },
    description: {
        type: String,
        required: [ true, "Descripción requerida" ],
        maxlength: [ 10 , "Decripción muy larga"],
    },
    weeks: {
        type: Number,
        required: [ true, "Semanas requerida" ],
        max: [ 9 , "El número máximo de semanas para un curso es 9"],
    },
    enroll_cost: {
        type: Number,
        required: [ true, "Costo de incripción requerido" ]
    },
    minimum_skill:{
        type: String,
        required: [ true, "Habilidad minima requerida" ],
        enum: [ "Beginner" , "Intermedate" , "Advanced" , "Expert" ]
    }
})

//Exportar el modelo
const coursesModel = mongoose
                .model("Courses" , 
                coursesSchema)

module.exports = coursesModel