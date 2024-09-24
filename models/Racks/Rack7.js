import mongoose from "mongoose";

const rack7Schema = new mongoose.Schema({
    section : {type : String , required : true },
    materialName : {type : String , required : true},
    availableStock : {type : Number , required : true},
    issue : {type : Number},
    receit : {type : String},
    closingStock : {type : Number , required : true},
}) ;

const Rack7 = mongoose.model('Rack7',rack7Schema) ;

export default Rack7 ;
