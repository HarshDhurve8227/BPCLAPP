import mongoose from 'mongoose';

const rack19Schema = new mongoose.Schema({
  section: { type: String, required: true },
  materialName: { type: String, required: true },
  availableStock: { type: Number, required: true },
  issue: { type: Number },
  receit: { type: String },
  closingStock: { type: Number, required: true },
});

const Rack19 = mongoose.model('Rack19', rack19Schema);
export default Rack19;