const mysql = require("./mysqlPool");

const getCyclesBeforeEnds = (days) => {
    return mysql.execute(`
    select studentspercycle.studentID, students.firstName, students.familyName, students.mobileNumber, students.email, students.location, coursesperstudent.examMark, coursesperstudent.projectMark, coursecycle.courseCode, courses.courseName
    from studentspercycle
    left join students on studentspercycle.studentID = students.studentID 
    left join coursecycle on studentspercycle.courseCycleCode = coursecycle.code 
    left join courses on courses.courseCode = coursecycle.courseCode 
    left join coursesperstudent on coursesperstudent.course = coursecycle.courseCode 
    and coursesperstudent.student = studentspercycle.studentID
    where courseCycleCode in (
    select cyclecode
    from
    (select cyclecode, max(sessionDate) as 'final_session' 
    FROM studentsTest2.sessionspercycle2
    group by cyclecode) as max_table
    where final_session < now() and final_session > (now()-60*60*24*?)
    )
    `,[days]);
  };


  module.exports.getCyclesBeforeEnds = getCyclesBeforeEnds;