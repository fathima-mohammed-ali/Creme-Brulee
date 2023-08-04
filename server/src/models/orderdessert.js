const mongoose = require ('mongoose')
const schema = mongoose.Schema
const orderDessertSchema = new schema({
    event:{type:String},
    theme:{type:String},
    item:{type:String},
    flavour:{type:String},
    date:{type:String},
    time:{type:String},
    location:{type:String},
    contact:{type:String}
})
const orderDessertModel=mongoose.model('order_dessert_tb',orderDessertSchema)
module.exports=orderDessertModel