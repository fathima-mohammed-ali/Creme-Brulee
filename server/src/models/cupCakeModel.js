const mongoose= require ('mongoose')
const schema= mongoose.Schema
const cupCakeSchema = new schema({
    cupcakename:{type:String},
    description:{type:String},
    ingredients:{type:String},
    price:{type:String},
    image:{type:String},
})
const cupCakeModel=mongoose.model('cup_cake_tb',cupCakeSchema)
module.exports=cupCakeModel