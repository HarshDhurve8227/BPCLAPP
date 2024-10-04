import mongoose from 'mongoose';

const rack21Schema = new mongoose.Schema({
  section: { type: Number, required: false },
  materialName: { type: String, required: false },
  availableStock: { type: Number, required: false },
  issue: { type: Number  , required: false},
  receit: { type: Number , required: false},
  closingStock: { type: Number, required: false },
});

const Rack21 = mongoose.model('Rack21', rack21Schema);
export default Rack21;