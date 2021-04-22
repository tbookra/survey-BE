const CoursesInfo = require('../models/mysql/courses');


const getStudentInfo = async (req, res) => {
  const {params: {id}} = req;
 
try{
const studentInfo = await CoursesInfo.getStudentInfo(id);
res.json({studentInfo})
}catch(e){
  
    console.log(e)
    res.json({error: true})
  }

}

    


module.exports.getStudentInfo = getStudentInfo;


