import mongoose from 'mongoose';

const rack1DSchema = new mongoose.Schema({
    files: [
        {
            id: { type: Number, required: true },
            name: { type: String, required: true }
        }
    ]
});

const Rack1D = mongoose.model('Rack1D', rack1DSchema);
export default Rack1D;
