import mongoose from 'mongoose';

const rack18Schema = new mongoose.Schema({
  section: { type: String, required: false },
  materialName: { type: String, required: false },
  availableStock: { type: Number, required: false },
  issue: { type: Number  , required: false},
  receit: { type: Number , required: false},
  closingStock: { type: Number, required: false },
});

const Rack18 = mongoose.model('Rack18', rack18Schema);
export default Rack18;