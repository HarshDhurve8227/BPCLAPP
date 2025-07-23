import mongoose from 'mongoose';

const rack2DSchema = new mongoose.Schema({
    files: [
        {
            id: { type: Number, required: true },
            name: { type: String, required: true }
        }
    ]
}, { collection: 'Rack2D' }); // Explicitly set the collection name

const Rack2D = mongoose.model('Rack2D', rack2DSchema);

export default Rack2D;
