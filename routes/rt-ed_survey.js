const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/surveyController');


/* GET home page. */
router.get('/:studentId/:courseId', surveyController.postByID);
router.post('/',surveyController.surveyResult);
router.post('/general',surveyController.generalReply);



module.exports = router;
