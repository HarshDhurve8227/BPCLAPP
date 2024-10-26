import mongoose from 'mongoose';

const rack2BSchema = new mongoose.Schema({
    files: [
        {
            id: { type: Number, required: true },
            name: { type: String, required: true }
        }
    ]
}, { collection: 'Rack2B' }); // Explicitly set the collection name

const Rack2B = mongoose.model('Rack2B', rack2BSchema);

export default Rack2B;
