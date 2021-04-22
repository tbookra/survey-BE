const express = require('express');
const router = express.Router();
const mailListsController = require('../controllers/mailListsController');


/* GET home page. */
router.get('/',mailListsController.getNearEndCourseStudents);



module.exports = router;