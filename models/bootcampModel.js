const mongoose = require('mongoose')

//Definir el Schema
//Definir el plano general de todo boocamp
//El number se debe poner en MAYUSCULA Number

const bootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, "Nombre requerido" ],
        unique : [true, "Nombre repetido"]
    },
    phone: {
        type: Number,
        required: [ true, "Telefono requerido" ],
        max: [ 9999999999 , "Telefono muy largo"]
    },
    address: {
        type: String,
        required: [ true, "Direccion requerida" ],
        maxlength: [ 20 , "Direccion muy larga"],
        minlength: [ 10 , "Direccion muy corta"]
    },
    topics: {
        type: [ String ],
        enum: [ "AI" , "Backend" , "Frontend" , "Devops" ]
    },
    createdAt: {
        type: Date
    }
})

//Exportar el modelo
const bootcampModel = mongoose
                .model("Bootcamp" , 
                bootcampSchema)

module.exports = bootcampModel