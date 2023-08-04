const express = require('express')
const orderModel = require('../models/orderModel')
const cakeModel = require('../models/cakeModel')
const order = express.Router()
const multer = require('multer')
const donutModel = require('../models/donutModel')
const orderDonutModel = require('../models/ordrdonut')
const dessertModel = require('../models/dessertModal')
const orderDessertModel = require('../models/orderdessert')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/creme-brulee/public/upload/')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name)
    }
})
const upload = multer({ storage: storage })

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

order.post('/donut',async(req,res)=>{
    try {
        const donutOrder = {
            event: req.body.event,
            theme: req.body.theme,
            pieces: req.body.pieces,
            flavour: req.body.flavour,
            date: req.body.date,
            time: req.body.time,
            location: req.body.location,
            contact: req.body.contact,
        }
        const order = await orderDonutModel(donutOrder).save()
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

order.post('/donut-details', upload.single('file'),async(req,res)=>{
    try {
        const donutdetails = {
            donutname: req.body.donutname,
            description: req.body.description,
            ingredients: req.body.ingredients,
            price: req.body.price,
            image: req.body.image,
        }
        // console.log(donutdetails);
        const saveDonut = await donutModel(donutdetails).save()
        console.log(saveDonut);
        if (saveDonut) {
            return res.status(200).json({
                success: true,
                error: false,
                details: saveDonut,
                message: "donut details saved"
            })
        }
        else {
            return res.status(404).json({
                success: false,
                error: true,
                message: "donut details missing"
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

order.get('/view-donut',async(req,res)=>{
    try {
        const id = req.params._id
        const viewDonut = await donutModel.find(id)
        if (viewDonut) {
            return res.status(200).json({
                success: true,
                error: false,
                details: viewDonut,
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

order.post('/delete-donut',async(req,res)=>{
    try {
        const name = req.body.donutname
        const deletedonut = await donutModel.deleteOne({ donutname: name })
        console.log(deletedonut);
        if (deletedonut.deletedCount==1) {
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

order.post('/update-donut/:name',async(req,res)=>{
    try {
        const donutName = req.params.name
        console.log(donutName);
         const { donutname, description, ingredients, price,image } = req.body;
 console.log(donutname, description, ingredients, price,image);
 
         const updateItem = await donutModel.updateMany({ donutname: donutName },
             { $set: { donutname, description, ingredients, price,image } }
 
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

order.post('/dessert',async(req,res)=>{
    try {
        const dessertOrder = {
            event: req.body.event,
            theme: req.body.theme,
            item:req.body.item,
            flavour: req.body.flavour,
            date: req.body.date,
            time: req.body.time,
            location: req.body.location,
            contact: req.body.contact,
        }
        const order = await orderDessertModel(dessertOrder).save()
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

order.post('/dessert-details',upload.single('file'),async(req,res)=>{
    try {
        const dessertdetails = {
            dessertname: req.body.dessertname,
            description: req.body.description,
            ingredients: req.body.ingredients,
            price: req.body.price,
            image: req.body.image,
        }
        // console.log(dessertdetails);
        const saveDessert = await dessertModel(dessertdetails).save()
        console.log(saveDessert);
        if (saveDessert) {
            return res.status(200).json({
                success: true,
                error: false,
                details: saveDessert,
                message: "dessert details saved"
            })
        }
        else {
            return res.status(404).json({
                success: false,
                error: true,
                message: "dessert details missing"
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

order.post('/view-dessert',async(req,res)=>{
    try {
        const id = req.params._id
        const viewDessert = await dessertModel.find(id)
        if (viewDessert) {
            return res.status(200).json({
                success: true,
                error: false,
                details: viewDessert,
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

order.post('/delete-dessert',async(req,res)=>{
    try {
        const name = req.body.dessertname
        const deletedessert = await dessertModel.deleteOne({ dessertname: name })
        console.log(deletedessert);
        if (deletedessert.deletedCount==1) {
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

order.post('/update-dessert/:name',async(req,res)=>{
    try {
        const dessertName = req.params.name
        console.log(dessertName);
         const { dessertname, description, ingredients, price,image } = req.body;
 console.log(dessertname, description, ingredients, price,image);
 
         const updateItem = await dessertModel.updateMany({ dessertname: dessertName },
             { $set: { dessertname, description, ingredients, price,image } }
 
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

order.get('/cake-price-filter',async(req,res)=>{
    try {
     const{minPrice,maxPrice}=req.query
     const items=await cakeModel.find({price:{$gte:minPrice,$lte:maxPrice}})
     if(items){
        return res.status(200).json({
            success:true,
            error:false,
            details:items,
            message:"filter process done"
        })
     }
     else{
        return res.status(400).json({
            success:false,
            error:true,
            message:"filter process failed"
        })  
     }
    } catch (error) {
        return res.status(400).json({
            success:true,
            error:false,
            message:"something went wrong"
        })    
    }
})
module.exports = order
