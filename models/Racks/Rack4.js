import mongoose from "mongoose";

const rack4Schema = new mongoose.Schema({
    section : {type : Number , required : false},
    materialName : {type : String , required : false}, 
    availableStock : {type :Number , required : false}, 
    issue : {type : Number , required: false},
    receit : {type : Number , required: false},
    closingStock : {type : Number , required : false},
}) ; 

const Rack4 =mongoose.model('Rack4',rack4Schema) ; 
export default Rack4  ; 