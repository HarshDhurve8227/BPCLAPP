import mongoose from 'mongoose';

const rack20Schema = new mongoose.Schema({
  section: { type: Number, required: false},
  materialName: { type: String, required: false },
  availableStock: { type: Number, required: false},
  issue: { type: Number  , required: false},
  receit: { type: Number , required: false },
  closingStock: { type: Number, required: false },
});

const Rack20 = mongoose.model('Rack20', rack20Schema);
export default Rack20;