const express = require('express')
const ReviewModel = require('../models/reviewModel')

//Definir ruteador 
const router = express.Router()

//Definir las rutas para opiniones con el ruteador
//Esta ruta va a traer todos los cursos
router.get('/', async (req , res) => {
    //Seleccionar todos las opiniones en la colección
    const reviews = 
        await ReviewModel.find()

    res.json({
        success: true,
        results: reviews
    })
})

//Seleccionar opiniones por ID
router.get('/:id' , async (req, res) => {
    //Recoger el parametro ID de la url
    reviewid = req.params.id
    //Seleccionar el opiniones por id
    selected_review =  await ReviewModel.findById(reviewid)
    //Enviar respuesta
    res.json({
        succes: true,
        results: selected_review
    })
})

//Exportar ruteador
module.exports = router