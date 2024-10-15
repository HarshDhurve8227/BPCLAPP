import mongoose from "mongoose";

const rack6Schema = new mongoose.Schema({
    section : {type : String , required : false },
    materialName : {type : String , required : false},
    availableStock : {type : Number , required : false},
    issue : {type : Number , required: false},
    receit : {
        type : Number , required: false
    },
    closingStock : { type : Number , required : false},
});

const Rack6 = mongoose.model('Rack6',rack6Schema);
export default Rack6 ; 