import mongoose from 'mongoose';

const rack15Schema = new mongoose.Schema({
  section: { type: String, required: true },
  materialName: { type: String, required: true },
  availableStock: { type: Number, required: true },
  issue: { type: Number },
  receit: { type: String },
  closingStock: { type: Number, required: true },
});


const Rack15 = mongoose.model('Rack15', rack15Schema);
export default Rack15;