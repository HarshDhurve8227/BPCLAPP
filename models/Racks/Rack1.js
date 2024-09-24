


import mongoose from 'mongoose';

const rack1Schema = new mongoose.Schema({
  section: { type: Number, required: true },
  materialName: { type: String, required: true },
  availableStock: { type: Number, required: true },
  issue: { type: Number, required: false }, // Assuming this is optional
  receit: { type: Number, required: false }, // Assuming this is optional
  closingStock: { type: Number, required: true },
});

const Rack1 = mongoose.model('Rack1', rack1Schema);
export default Rack1;

