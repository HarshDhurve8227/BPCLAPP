import mongoose from 'mongoose';

const rack22Schema = new mongoose.Schema({
  section: { type: String, required: false },
  materialName: { type: String, required: false },
  availableStock: { type: Number, required: false },
  issue: { type: Number , required: false },
  receit: { type: Number , required: false},
  closingStock: { type: Number, required: false },
});

const Rack22 = mongoose.model('Rack22', rack22Schema);
export default Rack22;