import mongoose from 'mongoose';

const rack17Schema = new mongoose.Schema({
  section: { type: Number, required: false },
  materialName: { type: String, required: false },
  availableStock: { type: Number, required: false },
  issue: { type: Number  , required: false},
  receit: { type: Number  , required: false},
  closingStock: { type: Number, required: false },
});

const Rack17 = mongoose.model('Rack17', rack17Schema);
export default Rack17;