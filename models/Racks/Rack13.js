import mongoose from 'mongoose';

const rack13Schema = new mongoose.Schema({
  section: { type: String, required: false },
  materialName: { type: String, required: false },
  availableStock: { type: Number, required: false},
  issue: { type: Number , required: false },
  receit: { type: Number , required: false },
  closingStock: { type: Number, required: false },
});

const Rack13 = mongoose.model('Rack13', rack13Schema);
export default Rack13;