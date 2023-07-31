const mongoose = require ('mongoose')
const schema = mongoose.Schema
const orderSchema = new schema({
    event:{type:String},
    theme:{type:String},
    kg:{type:String},
    flavour:{type:String},
    date:{type:String},
    time:{type:String},
    location:{type:String},
    contact:{type:String}
})
const orderModel=mongoose.model('order_tb',orderSchema)
module.exports=orderModel