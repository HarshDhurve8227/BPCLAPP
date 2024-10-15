import mongoose from 'mongoose';

const rack11Schema = new mongoose.Schema({
  section: { type: String , required: false },
  materialName: { type: String, required: false },
  availableStock: { type: Number, required: false },
  issue: { type: Number , required: false },
  receit: { type: Number  , required: false},
  closingStock: { type: Number, required: false },
});

const Rack11 = mongoose.model('Rack11', rack11Schema);
export default Rack11;