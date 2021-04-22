const Admin =  require('../models/mysql/admin');
const bcript = require('../auth/bcrypt');
const CoursesInfo = require('../models/mysql/courses');


const adminLogin = async (req, res) => {
    const {
        body: { usernameValue, passwordValue }} = req; 
    try{
        const user = await Admin.findAdmin(usernameValue);
        if(!user) return res.json({error: "the user does not exsists, or is not an admin"})
        let comparedPassword = await bcript.checkPassword(passwordValue, user[0][0].password);
        if(comparedPassword) {
            res.json({loggedIn: true})
        } else {
            res.json({error: "wrong email or password!!!"})
        }
    }catch(e){
      
        console.log(e)
        res.json({error: true})
      }
    
    }

const getCurrentQuestionTypes = async (req, res) => {
    try{
    const currentQuestions = await CoursesInfo.getAllQustions();
    let currentQuestionsArray = [];
    for (let i = 0; i < currentQuestions[0].length; i++){
        currentQuestionsArray.push(currentQuestions[0][i].relation)
    }
    let uniqeQuestions = [...new Set(currentQuestionsArray)];
    res.json({uniqeQuestions})
    }catch(e){
        console.log(e)
        res.json({error: true})
        }
    }

const getCurrentAnswerTypes = async (req, res) => {
    try{
        const currentAnswers = await CoursesInfo.getAllAnswers();
        let currentAnswersArray = [];
        for (let i = 0; i < currentAnswers[0].length; i++){
            currentAnswersArray.push(currentAnswers[0][i].answer_type)
        }
        let uniqeAnswers = [...new Set(currentAnswersArray)];
        res.json({uniqeAnswers})
}catch(e){
        console.log(e)
    res.json({error: true})
    }   
}

const getCurrentQuestions = async (req, res) => {
    const {params: {relationType}} = req;
    try{
        const currentQuestionsInfo = relationType === 'everything' ? 
                                await CoursesInfo.getAllQustions() : 
                                await CoursesInfo.getRelatedQustions(relationType);
        res.json({currentQuestionsInfo:currentQuestionsInfo[0]})                
    }catch(e){
    console.log(e)
    res.json({error: true})
    }
}

const addQuestion = async (req, res) => {
    const {body: {questionData}} = req;
    try{
        // questions, relation,answer_type, Anonymous,questions_order
        await Admin.addQuestion(questionData.questionValue, questionData.relation, questionData.answerType, questionData.isAnnonymous,questionData.questionOrder)
        res.json({successfull:true})     
    }catch(e){
        console.log(e)
        res.json({error: true})
        }
    }

const editQuestion = async (req, res) => {
    const {body: {questionData}} = req;
    try{
        const questionInfo = await Admin.getQuestionInfo(questionData.chosenQuestionId);
        await Admin.editQuestion(
            questionData.questionValue ? questionData.questionValue: questionInfo[0][0].questions ,
            questionData.relation ? questionData.relation : questionInfo[0][0].relation, 
            questionData.answerType ? questionData.answerType : questionInfo[0][0].answer_type, 
            questionData.isAnnonymous ? questionData.isAnnonymous : questionInfo[0][0].Anonymous,
            questionData.questionOrder ? questionData.questionOrder : questionInfo[0][0].questions_order, 
            questionData.isActive ? questionData.isActive : questionInfo[0][0].status,
            questionData.chosenQuestionId)
           
        res.json({successfull:true})     
    }catch(e){
        console.log(e)
        res.json({error: true})
        }
    }

const deleteQuestion = async (req, res) => {
    const {body: {chosenQuestionId}} = req;
    try{
        await Admin.deleteQuestion(chosenQuestionId)
        res.json({successfull:true})     
    }catch(e){
        console.log(e)
        res.json({error: true})
        }
    }

const getAllAnswers = async (req, res) => {
    try{
        const currentAnswers = await CoursesInfo.getAllAnswers();
        let answersTypesArray = [];
        for (let i = 0; i < currentAnswers[0].length; i++){
            answersTypesArray.push(currentAnswers[0][i].answer_type)
        };
        const uniqeAnswersTypesArray = [...new Set(answersTypesArray)];

        const anwersObj = uniqeAnswersTypesArray.map((ans)=>{
            return {
                answerType: ans,
                answers: setAnswers(ans,currentAnswers[0])
            }
        })
        res.json({anwersObj})
    }catch(e){
        console.log(e)
        res.json({error: true})
        }
    }

const getAllAnswersSimply = async (req, res) => {
    try{
        const currentAnswers = await CoursesInfo.getAllAnswers();
        res.json({currentAnswers: currentAnswers[0]})
    
    }catch(e){
        console.log(e)
        res.json({error: true})
        }
    }

const addAnswerType = async (req, res) => {
    const {body: {answersData}} = req;
    try{
        const answerOptionArray = answersData.answers.split(",")
        await Promise.all(answerOptionArray.forEach( async (answerOption) => {
            await Admin.addAnswers(answersData.answerType, answerOption )
        }));
        
        res.json({successfull:true})     
    }catch(e){
        console.log(e)
        res.json({error: true})
        }
    }

const addAnswerOption = async (req, res) => {
    const {body: {answersData}} = req;
    try{
        await Admin.addAnswers(answersData.answerType, answersData.answerOption )
        res.json({successfull:true})     
    }catch(e){
        console.log(e)
        res.json({error: true})
        }
    }

const editAnswerOption = async (req, res) => {
    const {body: {answersData}} = req;
    try{
        await Admin.editAnswerOption(answersData.answerOption, answersData.selectedId )
        res.json({successfull:true})     
    }catch(e){
        console.log(e)
        res.json({error: true})
        }
    }

const deleteAnswerOption = async (req, res) => {
    const {body: {selectedId}} = req;
    try{
        await Admin.deleteAnswerOption(selectedId)
        res.json({successfull:true})     
    }catch(e){
        console.log(e)
        res.json({error: true})
        }
    }
    
    module.exports.adminLogin = adminLogin;
    module.exports.getCurrentQuestionTypes = getCurrentQuestionTypes;
    module.exports.getCurrentAnswerTypes = getCurrentAnswerTypes;
    module.exports.getCurrentQuestions = getCurrentQuestions;
    module.exports.addQuestion = addQuestion;
    module.exports.editQuestion = editQuestion;
    module.exports.deleteQuestion = deleteQuestion;
    module.exports.getAllAnswers = getAllAnswers;
    module.exports.getAllAnswersSimply = getAllAnswersSimply;
    module.exports.addAnswerType = addAnswerType;
    module.exports.addAnswerOption = addAnswerOption;
    module.exports.editAnswerOption = editAnswerOption;
    module.exports.deleteAnswerOption = deleteAnswerOption;


    function setAnswers(answerType, anwerArray){
        return anwerArray.filter((item)=>item.answer_type == answerType  )
    }