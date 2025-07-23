import mongoose from 'mongoose';

const rack19Schema = new mongoose.Schema({
  section: { type: String, required: false },
  materialName: { type: String, required: false },
  availableStock: { type: Number, required: false },
  issue: { type: Number , required: false},
  receit: { type: Number , required: false},
  closingStock: { type: Number, required: false },
});

const Rack19 = mongoose.model('Rack19', rack19Schema);
export default Rack19;