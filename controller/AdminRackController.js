import Rack1A from '../models/CupboardRacks/Rack1A.js';
import Rack1B from '../models/CupboardRacks/Rack1B.js';
import Rack1C from '../models/CupboardRacks/Rack1C.js';
import Rack1D from '../models/CupboardRacks/Rack1D.js';
import Rack2A from '../models/CupboardRacks/Rack2A.js';
import Rack2B from '../models/CupboardRacks/Rack2B.js';
import Rack2C from '../models/CupboardRacks/Rack2C.js';
import Rack2D from '../models/CupboardRacks/Rack2D.js';

const racks = {
    'Rack1A': Rack1A,
    'Rack1B': Rack1B,
    'Rack1C': Rack1C,
    'Rack1D': Rack1D,
    'Rack2A': Rack2A,
    'Rack2B': Rack2B,
    'Rack2C': Rack2C,
    'Rack2D': Rack2D,
};

// Fetch data for specific rack
export const getRackDataa = async (req, res) => {
    const { rackName } = req.params;
    const RackModel = racks[rackName];

    if (!RackModel) {
        return res.status(404).json({ message: 'Rack not found' });
    }

    try {
        const data = await RackModel.find();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching rack data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Insert data for specific rack
export const insertRackDataa = async (req, res) => {
    const { rackName } = req.params;
    const RackModel = racks[rackName];

    if (!RackModel) {
        return res.status(404).json({ message: 'Rack not found' });
    }

    const { files } = req.body;
    const newEntry = new RackModel({ files });

    try {
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(400).json({ message: 'Bad request' });
    }
};
