import express from 'express';
const router = express.Router();
import * as publicationController from '../controllers/publication.controller.js';
import authMiddleware from '../middelware/user.middleware.js';

router.post('/batch', authMiddleware, publicationController.getPublicationsByIds);

export default router;
