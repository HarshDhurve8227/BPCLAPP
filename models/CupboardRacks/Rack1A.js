import mongoose from 'mongoose';

const rack1ASchema = new mongoose.Schema({
    files: [
        {
            id: { type: Number, required: true },
            name: { type: String, required: true }
        }
    ]
});

const Rack1A = mongoose.model('Rack1A', rack1ASchema);
export default Rack1A;
