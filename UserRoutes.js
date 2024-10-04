const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/UserController.js');

// Route to handle the form submission
router.post('/submit-exhibition', visitorController.submitExhibitionForm);

module.exports = router;
