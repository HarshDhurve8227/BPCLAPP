import mongoose from 'mongoose';

const rack24Schema = new mongoose.Schema({
  section: { type: String, required: true },
  materialName: { type: String, required: true },
  availableStock: { type: Number, required: true },
  issue: { type: Number },
  receit: { type: String },
  closingStock: { type: Number, required: true },
});

const Rack24 = mongoose.model('Rack24', rack24Schema);
export default Rack24;