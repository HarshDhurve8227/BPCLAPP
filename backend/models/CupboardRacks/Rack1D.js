import mongoose from 'mongoose';

const rack1DSchema = new mongoose.Schema({
    files: [
        {
            id: { type: Number, required: true },
            name: { type: String, required: true }
        }
    ]
}, { collection: 'Rack1D' }); // Explicitly set the collection name

const Rack1D = mongoose.model('Rack1D', rack1DSchema);
export default Rack1D;
