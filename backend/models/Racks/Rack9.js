import mongoose from 'mongoose';

const rack9Schema = new mongoose.Schema({
  section: { type: String , required: false},
  materialName: { type: String, required: false },
  availableStock: { type: Number, required: false },
  issue: { type: Number , required: false},
  receit: { type: Number , required: false},
  closingStock: { type: Number, required: false},
});

const Rack9 = mongoose.model('Rack9', rack9Schema);
export default Rack9;


