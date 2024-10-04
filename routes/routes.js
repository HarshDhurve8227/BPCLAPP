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
    getRackData
} from '../controller/RackController.js';
import {
    addEquipment,
    getEquipments,
    updateEquipment,
    deleteEquipment
} from '../controller/AmcController.js';

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

// Checklist route in routes.js
routers.post('/checklist', (req, res, next) => {
    console.log('Request to /api/checklist received');
    next();
}, saveChecklist);

// Equipment routes
routers.post('/equipment/add', addEquipment);
routers.get('/equipment/get', getEquipments);
routers.put('/equipment/update/:id', updateEquipment);
routers.delete('/equipment/delete/:id', deleteEquipment);

export default routers;
