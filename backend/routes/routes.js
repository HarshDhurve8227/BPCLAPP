import express from 'express';
import { CreateUser, GetUser, UpdateUser, DeleteUser, getProductById } from '../controller/UserController.js';
import { saveChecklist } from '../controller/ChecklistController.js';

const routers = express.Router();

// Dynamic department routes
routers.post('/:department/create', CreateUser);
routers.get('/:department/product', GetUser);
routers.put('/:department/update/:id', UpdateUser);
routers.delete('/:department/delete/:id', DeleteUser);
routers.get('/:department/product/:id', getProductById);
// Checklist route in routes.js
routers.post('/checklist', (req, res, next) => {
    console.log('Request to /api/checklist received');
    next();
}, saveChecklist);


export default routers;
