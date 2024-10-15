import mongoose from 'mongoose';

const rack8Schema = new mongoose.Schema({
  section: { type: String, required: false },
  materialName: { type: String, required: false },
  availableStock: { type: Number, required: false},
  issue: { type: Number , required: false},
  receit: { type: Number , required: false },
  closingStock: { type: Number, required: false},
});

const Rack8 = mongoose.model('Rack8', rack8Schema);
export default Rack8;
