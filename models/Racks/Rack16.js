import mongoose from 'mongoose';

const rack16Schema = new mongoose.Schema({
  section: { type: Number, required: false },
  materialName: { type: String, required: false },
  availableStock: { type: Number, required: false },
  issue: { type: Number , required: false },
  receit: { type: Number , required: false },
  closingStock: { type: Number, required: false },
});

const Rack16 = mongoose.model('Rack16', rack16Schema);
export default Rack16;