import mongoose from 'mongoose';

const equipmentSchema = new mongoose.Schema({
    equipment: { type: String, required: true },
    company: { type: String, required: true },
    validity: {
        from: { type: Date, required: true },
        to: { type: Date, required: true },
    },
    pms: {
        type: String,
        required: true,
        enum: ['Monthly', 'Quarterly'], // Define valid options
    },
    vendorCode: { type: String, required: true },
    contractNumber: { type: String, required: true },
    concernedPerson: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    lastDateOfChecking: { type: Date, required: true },
    nextDueDate: { type: Date, required: true },
});

const Equipment = mongoose.model('Equipment', equipmentSchema);
export default Equipment;
