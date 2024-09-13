// models/db1Model.js


import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    srno: { type: Number }, // Ensure this field is required if it should be
    Assets: { type: String }, // Ensure this field is required if it should be
    ComponentsAndEquipments: { type: String }, // Ensure this field is required if it should be
    AvailableStock: { type: Number },
    MinStock: { type: Number },
    LeadTime: { type: Number },
    ExcessShortFall: { type: Number },
    StatusofOrder: { type: String }
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

export default UserModel;

