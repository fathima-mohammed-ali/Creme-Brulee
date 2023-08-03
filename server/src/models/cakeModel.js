const mongoose= require ('mongoose')
const schema= mongoose.Schema
const cakeSchema = new schema({
    cakename:{type:String},
    description:{type:String},
    ingredients:{type:String},
    price:{type:String},
    image:{type:String},
})
const cakeModel=mongoose.model('cake_tb',cakeSchema)
module.exports=cakeModel