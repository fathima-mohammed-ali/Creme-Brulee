const mongoose = require ('mongoose')
const schema = mongoose.Schema
const orderDonutSchema = new schema({
    event:{type:String},
    theme:{type:String},
    pieces:{type:String},
    flavour:{type:String},
    date:{type:String},
    time:{type:String},
    location:{type:String},
    contact:{type:String}
})
const orderDonutModel=mongoose.model('order_donut_tb',orderDonutSchema)
module.exports=orderDonutModel