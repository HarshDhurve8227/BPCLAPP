import mongoose from 'mongoose';

const rack15Schema = new mongoose.Schema({
  section: { type: Number, required: false },
  materialName: { type: String, required: false },
  availableStock: { type: Number, required: false },
  issue: { type: Number , required: false },
  receit: { type: Number , required: false },
  closingStock: { type: Number, required: false },
});


const Rack15 = mongoose.model('Rack15', rack15Schema);
export default Rack15;