const express = require('express')
const router = express.Router()
const UserModel =  require('../models/UserModel')

//registrar usuarios
router.post('/register', async (req, res) => {
    try {
        const user = await UserModel.create(req.body)
        return res.status(201).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            succes: false,
            msg: error.message
        })
    }
})

//logear usuarios
router.post('/login', async function (req, res) {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        if(!user){
            res.status(401).json({
                succes: false,
                msg : "User not found"
            })
        }else{
            const isMatch = await user.compararPassword( password )
            if(!isMatch){
                return res.status(401).json({
                    succes: false,
                    msg: 'Claves invalidas'
                })
            }else{
                return res.status(200).json({
                    succes: true,
                    msg: 'Usuario logueado correctamente'
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: error.message
        })
    }
})

module.exports= router