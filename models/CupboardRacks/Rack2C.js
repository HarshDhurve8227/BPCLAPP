import mongoose from 'mongoose';

const rack2CSchema = new mongoose.Schema({
    files: [
        {
            id: { type: Number, required: true },
            name: { type: String, required: true }
        }
    ]
});

const Rack2C = mongoose.model('Rack2C', rack2CSchema);
export default Rack2C;
