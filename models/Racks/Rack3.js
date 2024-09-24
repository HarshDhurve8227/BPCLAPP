import mongoose from "mongoose";

const rack3Schema= new mongoose.Schema({
    section: {type:String ,required:true},
    materialName : {type : String , required : true},
    availableStock : {type : Number , required : true},
    issue : {type : Number },
    receit : {type : String},
    closingStock : {type : Number , required : true},
}) ; 

const Rack3 = mongoose.model('Rack3',rack3Schema) ;
export default Rack3 ;