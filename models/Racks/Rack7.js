import mongoose from "mongoose";

const rack7Schema = new mongoose.Schema({
    section : {type : String , required : false },
    materialName : {type : String , required : false},
    availableStock : {type : Number , required : false},
    issue : {type : Number , required: false},
    receit : {type : Number , required: false},
    closingStock : {type : Number , required : false},
}) ;

const Rack7 = mongoose.model('Rack7',rack7Schema) ;

export default Rack7 ;
