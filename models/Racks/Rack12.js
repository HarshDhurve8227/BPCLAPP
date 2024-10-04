import mongoose from 'mongoose';

const rack12Schema = new mongoose.Schema({
  section: { type: Number, required: false},
  materialName: { type: String, required: false},
  availableStock: { type: Number, required: false },
  issue: { type: Number  , required: false},
  receit: { type: Number , required: false},
  closingStock: { type: Number, required: false},
});

const Rack12 = mongoose.model('Rack12', rack12Schema);
export default Rack12;