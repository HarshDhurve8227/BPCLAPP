import mongoose from "mongoose";

const rack3Schema= new mongoose.Schema({
    section: {type:Number ,required:false},
    materialName : {type : String , required : false},
    availableStock : {type : Number , required : false},
    issue : {type : Number , required: false},
    receit : {type :  Number , required: false},
    closingStock : {type : Number , required : false},
}) ; 

const Rack3 = mongoose.model('Rack3',rack3Schema) ;
export default Rack3 ;