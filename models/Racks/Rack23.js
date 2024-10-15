import mongoose from 'mongoose';

const rack23Schema = new mongoose.Schema({
  section: { type: String, required: false },
  materialName: { type: String, required: false },
  availableStock: { type: Number, required: false },
  issue: { type: Number  , required: false},
  receit: { type: Number , required: false },
  closingStock: { type: Number, required: false },
});

const Rack23 = mongoose.model('Rack23', rack23Schema);
export default Rack23;