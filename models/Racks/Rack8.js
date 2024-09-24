import mongoose from 'mongoose';

const rack8Schema = new mongoose.Schema({
  section: { type: String, required: true },
  materialName: { type: String, required: true },
  availableStock: { type: Number, required: true },
  issue: { type: Number },
  receit: { type: String },
  closingStock: { type: Number, required: true },
});

const Rack8 = mongoose.model('Rack8', rack8Schema);
export default Rack8;
