import mongoose from 'mongoose';

const rack1CSchema = new mongoose.Schema({
    files: [
        {
            id: { type: Number, required: true },
            name: { type: String, required: true }
        }
    ]
}, { collection: 'Rack1C' }); // Explicitly set the collection name

const Rack1C = mongoose.model('Rack1C', rack1CSchema);
export default Rack1C;
