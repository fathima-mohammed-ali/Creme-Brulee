const mongoose= require ('mongoose')
const schema= mongoose.Schema
const DonutSchema = new schema({
    donutname:{type:String},
    description:{type:String},
    ingredients:{type:String},
    price:{type:String},
    image:{type:String},
})
const donutModel=mongoose.model('donut_tb',DonutSchema)
module.exports=donutModel