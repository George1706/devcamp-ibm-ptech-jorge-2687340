const express = require('express')
const BootcampModel = require('../models/bootcampModel')
const mongoose = require('mongoose')
//Definir ruteador 
const router = express.Router()

//Definir las rutas para bootcamps con el ruteador
//Esta ruta va a traer todos los bootcamps
router.get('/', async (req , res) => {
    //Seleccionar todos los bootcamps en la colección
    try {
            const bootcamps =
                await BootcampModel.find()
            if(bootcamps.length === 0){
                res.
                    status(400).
                    json({
                        success: false,
                        msg: "no hay bootcamps en la collection"
                })
            }else{
                res.
                    status(200).
                    json({
                        succes: true,
                        data: bootcamps
                    })
            }
    } catch (error) {
        res.status(error.status).json({
            success: false,
            msg: error.message
        })
    }

})

//Seleccionar bootcamp por ID
router.get('/:id' , async (req, res) => {

    try {
        //Recoger el parametro ID de la url
    bootcampid = req.params.id
    //validar el id suministrado
    if(!mongoose.Types.ObjectId.isValid(bootcampid)){
        res.status(500).json({
            success: false,
            msg: "El id no es valido"
        })
    }else{
        //Seleccionar el bootcamp por id
        selected_bootcamp =  await BootcampModel.findById(bootcampid)

        if(selected_bootcamp){
        //se encontró el bootcamp        
            res.status(200).json({
                succes: true,
                results: selected_bootcamp
            })
        }else{
            //no se encontró el bootcamp
            res.status(400).json({
                succes: false,
                msg: `No se encontró el bootcamp ${bootcampid}`
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
//Crear bootcamp
router.post('/', async(req , res) => {
    try {
        const newBootcamp = await BootcampModel.create(req.body)
        res.status(201).json({
            succes: true,
            results: newBootcamp
    })
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: error.message
        })
    }
})

//Actualizar bootcamp por ID
router.put('/:id' , async (req, res) => {

    try {
        //Recoger el parametro ID de la url
    bootcampid = req.params.id
    //validar el id suministrado
    if(!mongoose.Types.ObjectId.isValid(bootcampid)){
        res.status(500).json({
            success: false,
            msg: "El id no es valido"
        })
    }else{
        //Seleccionar el bootcamp por id
        selected_bootcamp =  await BootcampModel.
                        findByIdAndUpdate(bootcampid, 
                                          req.body, 
                                          {
                                               new: true
                                          })

        if(selected_bootcamp){
        //se encontró el bootcamp        
            res.status(200).json({
                succes: true,
                results: selected_bootcamp
            })
        }else{
            //no se encontró el bootcamp
            res.status(400).json({
                succes: false,
                msg: `No se encontró el bootcamp ${bootcampid}`
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


//Eliminar bootcamp por ID
router.delete('/:id' , async (req, res) => {

    try {
        //Recoger el parametro ID de la url
    bootcampid = req.params.id
    //validar el id suministrado
    if(!mongoose.Types.ObjectId.isValid(bootcampid)){
        res.status(500).json({
            success: false,
            msg: "El id no es valido"
        })
    }else{
        //Seleccionar el bootcamp por id
        selected_bootcamp =  await BootcampModel.findByIdAndDelete(bootcampid)

        if(selected_bootcamp){
        //se encontró el bootcamp        
            res.status(200).json({
                succes: true,
                results: selected_bootcamp
            })
        }else{
            //no se encontró el bootcamp
            res.status(400).json({
                succes: false,
                msg: `No se encontró el bootcamp ${bootcampid}`
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