import express from 'express';
import facultyController from '../controllers/faculty.controller.js';
import protect from '../middelware/user.middleware.js';

const router = express.Router();

// Update faculty profile
router.put('/profile', protect, facultyController.updateFacultyProfile);

// Add a new publication
router.post('/publications', protect, facultyController.addPublication);

export default router;
