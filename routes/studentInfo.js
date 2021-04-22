const express = require('express');
const router = express.Router();
const studentInfoController = require('../controllers/studentInfoController');

/* GET users listing. */
router.get('/:id', studentInfoController.getStudentInfo);

module.exports = router;
