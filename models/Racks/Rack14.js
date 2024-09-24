import mongoose from 'mongoose';

const rack14Schema = new mongoose.Schema({
  section: { type: String, required: true },
  materialName: { type: String, required: true },
  availableStock: { type: Number, required: true },
  issue: { type: Number },
  receit: { type: String },
  closingStock: { type: Number, required: true },
});

const Rack14 = mongoose.model('Rack14', rack14Schema);
export default Rack14;