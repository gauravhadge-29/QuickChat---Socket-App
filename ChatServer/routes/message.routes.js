import {Router} from 'express';
import {getUsersForSidebar,getMessages,markSeen} from '../controllers/message.controller.js';
import protectRoute from '../middleware/auth.middleware.js';

const messageRouter = Router();

messageRouter.get('/users',protectRoute, getUsersForSidebar);
messageRouter.get('/:id',protectRoute, getMessages);
messageRouter.put('/mark/:id',protectRoute, markSeen);

export default messageRouter



