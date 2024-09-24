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
    addItemToRack,
    updateItemInRack,
    getItemsInRack,
    deleteItemFromRack
} from '../controller/RackController.js';

const routers = express.Router();

// Dynamic department routes
routers.post('/:department/create', CreateUser);
routers.get('/:department/product', GetUser);
routers.put('/:department/update/:id', UpdateUser);
routers.delete('/:department/delete/:id', DeleteUser);
routers.get('/:department/product/:id', getProductById);

// Rack routes
routers.post('/:rackType/create', addItemToRack);
routers.put('/:rackType/update/:itemId', updateItemInRack);
routers.get('/:rackType/items', getItemsInRack);
routers.delete('/:rackType/delete/:itemId', deleteItemFromRack);

// Checklist route in routes.js
routers.post('/checklist', (req, res, next) => {
    console.log('Request to /api/checklist received');
    next();
}, saveChecklist);

export default routers;
