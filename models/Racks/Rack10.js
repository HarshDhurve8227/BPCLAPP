import mongoose from "mongoose";

const rack10Schema= new mongoose.Schema({
    section : {type : String , required : true },
    materialName : {type : String , required : true },
    availableStock : { type : Number , required : true},
    issue : { type : Number}, 
    receit : { type : String},
    closingStock : {type : Number , required : true  }, 
}) ;

const Rack10 = mongoose.model('Rack10', rack10Schema) ;
export default  Rack10 ;