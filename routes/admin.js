const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


/* GET home page. */
router.post('/',adminController.adminLogin);
router.get('/getCurrentQuestionsTypes', adminController.getCurrentQuestionTypes);
router.get('/getCurrentAnswersTypes', adminController.getCurrentAnswerTypes);
router.get('/getCurrentQuestions/:relationType', adminController.getCurrentQuestions);
router.post('/addQuestion', adminController.addQuestion);
router.post('/editQuestion', adminController.editQuestion);
router.post('/deleteQuestion', adminController.deleteQuestion);
router.get('/getAllAnswers', adminController.getAllAnswers);
router.get('/getAllAnswersSimply', adminController.getAllAnswersSimply);
router.post('/addAnswerType',adminController.addAnswerType);
router.post('/addAnswerOption',adminController.addAnswerOption);
router.post('/editAnswerOption',adminController.editAnswerOption);
router.post('/deleteAnswerOption',adminController.deleteAnswerOption);


module.exports = router;