import mongoose from 'mongoose';
import Rack1 from '../models/Racks/Rack1.js'; 
import Rack2 from '../models/Racks/Rack2.js';
import Rack3 from '../models/Racks/Rack3.js';
import Rack4 from '../models/Racks/Rack4.js';
import Rack5 from '../models/Racks/Rack5.js';
import Rack6 from '../models/Racks/Rack6.js';
import Rack7 from '../models/Racks/Rack7.js';
import Rack8 from '../models/Racks/Rack8.js';
import Rack9 from '../models/Racks/Rack9.js';
import Rack10 from '../models/Racks/Rack10.js';
import Rack11 from '../models/Racks/Rack11.js';
import Rack12 from '../models/Racks/Rack12.js';
import Rack13 from '../models/Racks/Rack13.js'; 
import Rack14 from '../models/Racks/Rack14.js';
import Rack15 from '../models/Racks/Rack15.js';
import Rack16 from '../models/Racks/Rack16.js';
import Rack17 from '../models/Racks/Rack17.js';
import Rack18 from '../models/Racks/Rack18.js';
import Rack19 from '../models/Racks/Rack19.js';
import Rack20 from '../models/Racks/Rack20.js';
import Rack21 from '../models/Racks/Rack21.js';
import Rack22 from '../models/Racks/Rack22.js';
import Rack23 from '../models/Racks/Rack23.js';
import Rack24 from '../models/Racks/Rack24.js';

const rackModels = {
  '1': Rack1,
  '2': Rack2,
  '3': Rack3,
  '4': Rack4,
  '5': Rack5,
  '6': Rack6,
  '7': Rack7,
  '8': Rack8,
  '9': Rack9,
  '10': Rack10,
  '11': Rack11,
  '12': Rack12,
  '13': Rack13,
  '14': Rack14,
  '15': Rack15,
  '16': Rack16,
  '17': Rack17,
  '18': Rack18,
  '19': Rack19,
  '20': Rack20,
  '21': Rack21,
  '22': Rack22,
  '23': Rack23,
  '24': Rack24,
};

export const insertRackData = async (req, res) => {
  const { rackNumber } = req.params;
  const RackModel = rackModels[rackNumber];

  if (!RackModel) {
    return res.status(404).json({ message: 'Rack model not found' });
  }

  console.log('Inserting data for rack:', rackNumber);
  console.log('Request body:', req.body);

  try {
    const newRack = new RackModel(req.body);
    await newRack.save();
    res.status(201).json(newRack);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(400).json({ message: error.message });
  }
};

export const getRackData = async (req, res) => {
  const { rackNumber } = req.params;
  const RackModel = rackModels[rackNumber];

  if (!RackModel) {
    return res.status(404).json({ message: 'Rack model not found' });
  }

  try {
    const racks = await RackModel.find();
    res.status(200).json(racks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// New update function
export const updateRackData = async (req, res) => {
  const { rackNumber, _id } = req.params;
  const RackModel = rackModels[rackNumber];

  if (!RackModel) {
    return res.status(404).json({ message: 'Rack model not found' });
  }

  try {
    const updatedRack = await RackModel.findByIdAndUpdate(_id , req.body, { new: true });
    if (!updatedRack) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedRack);
  } catch (error) {
    console.error('Error updating rack data:', error);
    res.status(400).json({ message: error.message });
  }
};
