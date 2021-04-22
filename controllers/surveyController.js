const CoursesInfo = require('../models/mysql/courses');
const surveyResults = require('../models/mysql/SurveyResults');
const setSurveyLink = require('../api/setSurveyLink');

const postByID = async (req, res) => {

const GOOD_ATTENDANCE = process.env.GOOD_ATTENDANCE;
const GOOD_EXAM_SCORE = process.env.GOOD_EXAM_SCORE;
let relation = "generic"; 
try{
    const {params: {studentId,courseId}} = req;
    const {base64_URLString, error_message} = await setSurveyLink(studentId,courseId); // link string to be used later
    if(error_message) {
        console.log('error_message:',error_message)
        res.json({error: true})
    } else {
        // if(base64_URLString) console.log('base64_URLString',base64_URLString) ;
        const studentAttendance = await CoursesInfo.getStudentAttendance(studentId,courseId);
        const attendancePercentage = studentAttendance[0][0].visits / studentAttendance[0][0].total;
        const courseGrade = await CoursesInfo.getAllStudentCourses(studentId,courseId);
        const examScore = courseGrade[0][0].examMark; 
        relation = examScore === 0 ? (attendancePercentage>GOOD_ATTENDANCE ? "generic" : "low_attendance") 
                : examScore > GOOD_EXAM_SCORE ? "generic" : "bad_score";
        
        const course = await CoursesInfo.getCourseInfo(courseId);
        const questionList = await CoursesInfo.getRelatedActiveQustions(relation, 'active');
        const answerList = await CoursesInfo.getAllAnswers();
        const questionObj = questionList[0].map((question) =>  { // creating an object with the right answer options to the questions
        return{...question,
            answer: setAnswers(question.answer_type,answerList[0]),
            }})
        res.json({ course, questionObj })
    } ;

}catch(e){
    console.log(e)
    res.json({error: true})
    
  }

}
const surveyResult = async (req, res) => {
    const {body:resultObject} = req;
    try{
        const fakeId = `fake${Math.floor(Math.random()*1000000)}`;
        let isAnonimous;
        for (const answer in resultObject){
            for (const prop in resultObject[answer]){
                isAnonimous = await CoursesInfo.getAnonymousType(resultObject[answer][prop].trimNam)
                if(isAnonimous[0][0].Anonymous){
                    await surveyResults.insertResults(
                        fakeId,
                        resultObject[answer][prop].trimNam ,
                        resultObject[answer][prop].courseId,
                        resultObject[answer][prop].val
                        )  
                } else {
                    await surveyResults.insertResults(
                        resultObject[answer][prop].studentId,
                        resultObject[answer][prop].trimNam ,
                        resultObject[answer][prop].courseId,
                        resultObject[answer][prop].val
                        )  
                }
            }
        }
        res.json({successfull:true})
        // res.end();
    }catch(e){
        console.log(e)
      }
    
    }
    
    const generalReply = async (req, res) => {
        const {body:resultObject} = req;
        try{
           
        
            for (const answer in resultObject){
                for (const prop in resultObject[answer]){
               
                        await surveyResults.insertResults(
                            resultObject[answer][prop].studentId,
                            resultObject[answer][prop].trimNam ,
                            resultObject[answer][prop].courseId,
                            resultObject[answer][prop].val
                            )  
                }
            }
            res.json({successfull:true})
            // res.end();
        }catch(e){
            console.log(e)
          }
        
        }


module.exports.postByID = postByID;
module.exports.surveyResult = surveyResult;
module.exports.generalReply = generalReply;


function setAnswers(answerType, anwerArray){
    return anwerArray.filter((item)=>item.answer_type == answerType  )
}

