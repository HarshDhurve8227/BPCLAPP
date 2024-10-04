import mongoose from 'mongoose';

const rack2Schema = new mongoose.Schema({
  section: { type: Number, required: false},
  materialName: { type: String, required: false },
  availableStock: { type: Number, required: false },
  issue: { type: Number ,required: false},
  receit: { type: Number,required: false },
  closingStock: { type: Number, required: false },
});

const Rack2 = mongoose.model('Rack2', rack2Schema);
export default Rack2;
