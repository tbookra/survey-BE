const CoursesInfo = require('../models/mysql/courses');
const base64 = require('base-64');

module.exports = async (studentId, courseId) =>{
   const URL_BASE = process.env.URL_BASE_FOR_LINK;
try{
    const student = await CoursesInfo.getActiveStudent(studentId);
    if (student[0].length === 0) return {error_message: `${studentId} does not exist on our DB, or is not an active one`};
    const studentCourses = await CoursesInfo.getStudentAttendance(studentId,courseId);
    if (studentCourses[0].length === 0) {
    return {error_message: `the student of id: ${studentId} doesn't assign for course id ${courseId}`};}
    else {
        const urlString = `${URL_BASE}/${studentId}/${courseId}`
        const base64_URLString = base64.encode(urlString)
        // console.log('base64String',base64_URLString)
        // console.log('test ', base64.encode('http://localhost:3000/032173296/125'))
        // console.log('test2', base64.decode('aHR0cDovL2xvY2FsaG9zdDozMDAwLzAzMjE3MzI5Ni8'))
        return base64_URLString;
    }
    
}catch(e){
    console.log(e)
  }
}