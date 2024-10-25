import mongoose from 'mongoose';

const rack2ASchema = new mongoose.Schema({
    files: [
        {
            id: { type: Number, required: true },
            name: { type: String, required: true }
        }
    ]
});

const Rack2A = mongoose.model('Rack2A', rack2ASchema);
export default Rack2A;
