import mongoose from 'mongoose';

const FireFightuSchema = new mongoose.Schema({
    srno: { type: Number }, // Ensure this field is required if it should be
    Assets: { type: String }, // Ensure this field is required if it should be
    ComponentsAndEquipments: { type: String }, // Ensure this field is required if it should be
    AvailableStock: { type: Number },
    MinStock: { type: Number },
    LeadTime: { type: Number },
    ExcessShortFall: { type: Number },
    StatusofOrder: { type: String }
}, { timestamps: true });

const FireFightUserModel = mongoose.model('FireFight', FireFightuSchema);

export default FireFightUserModel;