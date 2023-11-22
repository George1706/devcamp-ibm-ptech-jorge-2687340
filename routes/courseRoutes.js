const express = require('express')
const coursesModel = require('../models/courseModel')
const mongoose = require('mongoose')
//Definir ruteador 
const router = express.Router()

//Definir las rutas para courses con el ruteador
//Esta ruta va a traer todos los courses
router.get('/', async (req , res) => {
    //Seleccionar todos los bootcamps en la colección
    try {
            const courses =
                await coursesModel.find()
            if(courses.length === 0){
                res.
                    status(400).
                    json({
                        success: false,
                        msg: "no hay courses en la collection"
                })
            }else{
                res.
                    status(200).
                    json({
                        succes: true,
                        data: courses
                    })
            }
    } catch (error) {
        res.status(error.status).json({
            success: false,
            msg: error.message
        })
    }

})

//Seleccionar courses por ID
router.get('/:id' , async (req, res) => {

    try {
        //Recoger el parametro ID de la url
    coursesid = req.params.id
    //validar el id suministrado
    if(!mongoose.Types.ObjectId.isValid(coursesid)){
        res.status(500).json({
            success: false,
            msg: "El id no es valido"
        })
    }else{
        //Seleccionar el course por id
        selected_courses=  await coursesModel.findById(coursesid)

        if(selected_courses){
        //se encontró el course        
            res.status(200).json({
                succes: true,
                results: selected_courses
            })
        }else{
            //no se encontró el course
            res.status(400).json({
                succes: false,
                msg: `No se encontró el course ${coursesid}`
            })
        }

            //Enviar respuesta
    }
    }catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }

})

//Para que funcione en thunder client, en el sector de header hay que poner content-type y poner value json
//Crear course
router.post('/', async(req , res) => {
    try {
        const newCourses = await coursesModel.create(req.body)
        res.status(201).json({
            succes: true,
            results: newCourses
    })
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: error.message
        })
    }
})

//Actualizar courses por ID
router.put('/:id' , async (req, res) => {

    try {
        //Recoger el parametro ID de la url
    coursesid = req.params.id
    //validar el id suministrado
    if(!mongoose.Types.ObjectId.isValid(coursesid)){
        res.status(500).json({
            success: false,
            msg: "El id no es valido"
        })
    }else{
        //Seleccionar el course por id
        selected_courses =  await coursesModel.
                        findByIdAndUpdate(coursesid, 
                                          req.body, 
                                          {
                                               new: true
                                          })

        if(selected_courses){
        //se encontró el course        
            res.status(200).json({
                succes: true,
                results: selected_courses
            })
        }else{
            //no se encontró el course
            res.status(400).json({
                succes: false,
                msg: `No se encontró el course ${coursesid}`
            })
        }

            //Enviar respuesta
    }
    }catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }

})


//Eliminar course por ID
router.delete('/:id' , async (req, res) => {

    try {
        //Recoger el parametro ID de la url
    coursesid = req.params.id
    //validar el id suministrado
    if(!mongoose.Types.ObjectId.isValid(coursesid)){
        res.status(500).json({
            success: false,
            msg: "El id no es valido"
        })
    }else{
        //Seleccionar el course por id
        selected_courses =  await coursesModel.findByIdAndDelete(coursesid)

        if(selected_courses){
        //se encontró el course        
            res.status(200).json({
                succes: true,
                results: selected_courses
            })
        }else{
            //no se encontró el course
            res.status(400).json({
                succes: false,
                msg: `No se encontró el course ${coursesid}`
            })
        }

            //Enviar respuesta
    }
    }catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        })
    }

})


//Exportar ruteador
module.exports = router