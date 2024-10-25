import mongoose from 'mongoose';

const rack1CSchema = new mongoose.Schema({
    files: [
        {
            id: { type: Number, required: true },
            name: { type: String, required: true }
        }
    ]
});

const Rack1C = mongoose.model('Rack1C', rack1CSchema);
export default Rack1C;
