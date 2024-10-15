import mongoose from "mongoose";

const rack5Schema = new mongoose.Schema({
    section : {type : String , required : false},
    materialName : {type : String , required : false},
    availableStock : {type : Number , required : false},
    issue : {type : Number , required: false},
    receit : {type : Number , required: false},
    closingStock : {type : Number , required : false},
    
}) ;

const Rack5 = mongoose.model('Rack5',rack5Schema);
export default Rack5 ;