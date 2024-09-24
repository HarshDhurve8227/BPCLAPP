import mongoose from 'mongoose';

const rack18Schema = new mongoose.Schema({
  section: { type: String, required: true },
  materialName: { type: String, required: true },
  availableStock: { type: Number, required: true },
  issue: { type: Number },
  receit: { type: String },
  closingStock: { type: Number, required: true },
});

const Rack18 = mongoose.model('Rack18', rack18Schema);
export default Rack18;