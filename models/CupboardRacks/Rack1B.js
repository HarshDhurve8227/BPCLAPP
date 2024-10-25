import mongoose from 'mongoose';

const rack1BSchema = new mongoose.Schema({
    files: [
        {
            id: { type: Number, required: true },
            name: { type: String, required: true }
        }
    ]
});

const Rack1B = mongoose.model('Rack1B', rack1BSchema);
export default Rack1B;
