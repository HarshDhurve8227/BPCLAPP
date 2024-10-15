import mongoose from "mongoose";

const rack10Schema= new mongoose.Schema({
    section : {type : String , required : false },
    materialName : {type : String , required : false },
    availableStock : { type : Number , required : false},
    issue : { type : Number , required: false}, 
    receit : { type : Number , required: false},
    closingStock : {type : Number , required : false  }, 
}) ;

const Rack10 = mongoose.model('Rack10', rack10Schema) ;
export default  Rack10 ;