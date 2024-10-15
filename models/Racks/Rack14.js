import mongoose from 'mongoose';

const rack14Schema = new mongoose.Schema({
  section: { type: String, required:false },
  materialName: { type: String, required: false},
  availableStock: { type: Number, required: false },
  issue: { type: Number , required: false },
  receit: { type: Number , required: false },
  closingStock: { type: Number, required: false },
});

const Rack14 = mongoose.model('Rack14', rack14Schema);
export default Rack14;