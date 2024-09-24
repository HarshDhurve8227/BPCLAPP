import mongoose from "mongoose";

const rack4Schema = new mongoose.Schema({
    section : {type : String , required : true},
    materialName : {type : String , required : true}, 
    availableStock : {type :Number , required : true}, 
    issue : {type : Number},
    receit : {type : String},
    closingStock : {type : Number , required : true},
}) ; 

const Rack4 =mongoose.model('Rack4',rack4Schema) ; 
export default Rack4  ; 