


import mongoose from 'mongoose';

const rack1Schema = new mongoose.Schema({
  section: { type: String, required: false },
  materialName: { type: String, required: false },
  availableStock: { type: Number, required: false },
  issue: { type: Number, required: false }, // Assuming this is optional
  receit: { type: Number, required: false }, // Assuming this is optional
  closingStock: { type: Number, required: false },
});


const Rack1 = mongoose.model('Rack1', rack1Schema);
export default Rack1;

