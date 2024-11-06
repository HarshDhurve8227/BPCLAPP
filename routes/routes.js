import express from 'express';
import {
    CreateUser,
    GetUser,
    UpdateUser,
    DeleteUser,
    getProductById
} from '../controller/UserController.js';
import { saveChecklist } from '../controller/ChecklistController.js';
import {
    insertRackData,
    getRackData,
    updateRackData // Importing the update function
} from '../controller/RackController.js';

import {
    addEquipment,
    getEquipments,
    updateEquipment,
    deleteEquipment
} from '../controller/AmcController.js';

import { getRackDataa , insertRackDataa , updateRackDataa} from '../controller/AdminRackController.js';






const routers = express.Router();

// Dynamic department routes
routers.post('/:department/create', CreateUser);
routers.get('/:department/product', GetUser);
routers.put('/:department/update/:id', UpdateUser);
routers.delete('/:department/delete/:id', DeleteUser);
routers.get('/:department/product/:id', getProductById);

// Rack routes
routers.post('/rack/:rackNumber', insertRackData); // Route for inserting rack data
routers.get('/rack/:rackNumber', getRackData); // Route for fetching rack data
routers.put('/rackupdate/:rackNumber/:_id', updateRackData); // Route for updating rack data
routers.get('/rack/:rackNumber/:_id', getRackData);

// Checklist route
routers.post('/checklist', (req, res, next) => {
    console.log('Request to /api/checklist received');
    next();
}, saveChecklist);

// Equipment routes
routers.post('/equipment/add', addEquipment);
routers.get('/equipment/get', getEquipments);
routers.put('/equipment/updated/:id', updateEquipment);
routers.delete('/equipment/delete/:id', deleteEquipment);
routers.get('/equipment/get/:id', getEquipments);


// Rack routes
routers.post('/racks/:rackName', insertRackDataa); // Route for inserting rack data
routers.get('/racks/:rackName', getRackDataa); // Route for fetching rack data
routers.put('/racks/:rackName/files/:fileId', updateRackDataa);
 // Route for updating rack data




export default routers;
