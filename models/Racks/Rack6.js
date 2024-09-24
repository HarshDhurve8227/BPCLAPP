import mongoose from "mongoose";

const rack6Schema = new mongoose.Schema({
    section : {type : String , required : true },
    materialName : {type : String , required : true},
    availableStock : {type : Number , required : true},
    issue : {type : Number},
    receit : {
        type : String
    },
    closingStock : { type : Number , required : true},
});

const Rack6 = mongoose.model('Rack6',rack6Schema);
export default Rack6 ;