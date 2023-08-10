const mongoose = require ('mongoose')
const schema = mongoose.Schema
const orderCupCakeSchema = new schema({
    event:{type:String},
    theme:{type:String},
    item:{type:String},
    flavour:{type:String},
    cupcakeNo:{type:String},
    date:{type:String},
    time:{type:String},
    location:{type:String},
    contact:{type:String}
})
const orderCupCakeModel=mongoose.model('order_cupcake_tb',orderCupCakeSchema)
module.exports=orderCupCakeModel