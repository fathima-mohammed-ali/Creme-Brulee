const mongoose= require ('mongoose')
const schema= mongoose.Schema
const DessertSchema = new schema({
    dessertname:{type:String},
    description:{type:String},
    ingredients:{type:String},
    price:{type:String},
    image:{type:String},
})
const dessertModel=mongoose.model('dessert_tb',DessertSchema)
module.exports=dessertModel