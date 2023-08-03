const express = require('express')
const orderModel = require('../models/orderModel')
const cakeModel = require('../models/cakeModel')
const order = express.Router()
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/creme-brulee/public/upload/')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name)
    }
})
const upload = multer({ storage: storage })
// order.post('/upload',upload.single('file'),async(req,res)=>{
//     return res.status(200).json({
//         message:"file upload"

//     })
// })

order.post('/cake', async (req, res) => {
    try {
        const cakeOrder = {
            event: req.body.event,
            theme: req.body.theme,
            kg: req.body.kg,
            flavour: req.body.flavour,
            date: req.body.date,
            time: req.body.time,
            location: req.body.location,
            contact: req.body.contact,
        }
        const order = await orderModel(cakeOrder).save()
        if (order) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "order received"
            })
        }
        else {
            return res.status(404).json({
                success: false,
                error: true,
                message: "order not received"
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: true,
            error: false,
            message: "something went wrong"
        })
    }
})

order.post('/cake-details', upload.single('file'), async (req, res) => {
    try {
        const cakedetails = {
            cakename: req.body.cakename,
            description: req.body.description,
            ingredients: req.body.ingredients,
            price: req.body.price,
            image: req.body.image,
        }
        const saveCake = await cakeModel(cakedetails).save()
        if (saveCake) {
            return res.status(200).json({
                success: true,
                error: false,
                details: saveCake,
                message: "cake details saved"
            })
        }
        else {
            return res.status(404).json({
                success: false,
                error: true,
                message: "cake details missing"
            })
        }
    } catch (error) {
        return res.status(404).json({
            success: false,
            error: true,
            message: "something went wrong"
        })
    }
})

order.get('/view-cake', async (req, res) => {
    try {
        const id = req.params._id
        const viewCake = await cakeModel.find(id)
        if (viewCake) {
            return res.status(200).json({
                success: true,
                error: false,
                details: viewCake,
                message: "ready to view"
            })
        }
        else {
            return res.status(404).json({
                success: false,
                error: true,
                message: "can't view"
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: true,
            error: false,
            message: "something went wrong"
        })
    }
})

order.post('/delete-cake', async (req, res) => {
    try {
        const name = req.body.cakename
        const deletecake = await cakeModel.deleteOne({ cakename: name })
        console.log(deletecake);
        if (deletecake.deletedCount==1) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "item is deleted"
            })
        }
        else {
            return res.status(404).json({
                success: false,
                error: true,
                message: "item not found"
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            message: "something went wrong"
        })
    }
})

order.post('/update-cake/:name', async (req, res) => {
    try {
       const cakeName = req.params.name
       console.log(cakeName);
        const { cakename, description, ingredients, price,image } = req.body;
console.log(cakename, description, ingredients, price,);

        const updateItem = await cakeModel.updateMany({ cakename: cakeName },
            { $set: { cakename, description, ingredients, price,image } }

        );
console.log(updateItem);
        if (updateItem.modifiedCount == 1) {
            return res.status(200).json({
                success: true,
                error: false,
                details: updateItem,
                message: "Data Updated"
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Not Updated"
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: true,
            error: false,
            message: "something went wrong"
        })
    }
})

order.get('/single-view/:cakename', async (req, res) => {
    try {
        const name = req.params.cakename
        console.log(name);
        const viewCake = await cakeModel.findOne({ cakename: name })
        console.log(viewCake);
        if (viewCake) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "single view"
            })
        }
        else {
            return res.status(404).json({
                success: false,
                error: true,
                message: "unable to view"
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            message: "something went wrong"
        })
    }
})

module.exports = order
