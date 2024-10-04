import mongoose from 'mongoose';

const rack24Schema = new mongoose.Schema({
  section: { type: Number, required: false },
  materialName: { type: String, required: false },
  availableStock: { type: Number, required: false },
  issue: { type: Number , required: false },
  receit: { type: Number  , required: false},
  closingStock: { type: Number, required: false },
});

const Rack24 = mongoose.model('Rack24', rack24Schema);
export default Rack24;