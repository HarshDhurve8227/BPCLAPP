import mongoose from 'mongoose';



// RackController.js


// Function to handle inserting data into a specific rack
export const insertRackData = async (req, res) => {
  const { rackNumber } = req.params;
  const RackModel = mongoose.model(`Rack${rackNumber}`, new mongoose.Schema({
    section: { type: Number, required: false },
    materialName: { type: String, required: false },
    availableStock: { type: Number, required: false },
    issue: { type: Number, required: false },
    receit: { type: Number, required: false },
    closingStock: { type: Number, required: false },
  }));

  try {
    const newRack = new RackModel(req.body);
    await newRack.save();
    res.status(201).json(newRack);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to handle fetching data from a specific rack
export const getRackData = async (req, res) => {
  const { rackNumber } = req.params;
  const RackModel = mongoose.model(`Rack${rackNumber}`, new mongoose.Schema({
    section: { type: Number, required: false },
    materialName: { type: String, required: false },
    availableStock: { type: Number, required: false },
    issue: { type: Number, required: false },
    receit: { type: Number, required: false },
    closingStock: { type: Number, required: false },
  }));

  try {
    const racks = await RackModel.find();
    res.status(200).json(racks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
