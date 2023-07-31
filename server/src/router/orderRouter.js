const express = require ('express')
const orderModel = require('../models/orderModel')
const order = express.Router()

order.post('/cake',async(req,res)=>{
    try {
        const cakeOrder={
            event:req.body.event,
            theme:req.body.theme,
            kg:req.body.kg,
            flavour:req.body.flavour,
            date:req.body.date,
            time:req.body.time,
            location:req.body.location,
            contact:req.body.contact,
        }
        const order= await orderModel(cakeOrder).save()
        if(order){
            return res.status(200).json({
                success:true,
                error:false,
                message:"order received"
            })
        }
        else{
            return res.status(404).json({
                success:false,
                error:true,
                message:"order not received"
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

module.exports= order
