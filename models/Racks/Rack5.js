import mongoose from "mongoose";

const rack5Schema = new mongoose.Schema({
    section : {type : String , required : true},
    materialName : {type : String , required : true},
    availableStock : {type : Number , required : true},
    issue : {type : Number},
    receit : {type : String},
    closingStock : {type : Number , required : true},
    
}) ;

const Rack5 = mongoose.model('Rack5',rack5Schema);
export default Rack5 ;