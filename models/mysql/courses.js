const mysql = require("./mysqlPool");

const getStudentAttendance = (studentID,courseId) => {
    return mysql.execute(`
    select cyclecode ,coursecycle.courseCode ,count(*) as total,count(CASE WHEN student_visit.visit = 1 then 1 ELSE NULL END) as "visits"
    from sessionspercycle2 left join coursecycle on coursecycle.code = sessionspercycle2.cyclecode
    left join studentspercycle on studentspercycle.courseCycleCode = coursecycle.code
    left join student_visit on student_visit.cycle = sessionspercycle2.cyclecode
    and student_visit.studentID = studentspercycle.studentID and student_visit.session = sessionspercycle2.session_num
    inner join students on students.studentID = coursecycle.teacherID
    where studentspercycle.studentID = ? and courseCode = ?
    group by cyclecode;
    `,[studentID,courseId]);
  };

const getCourseInfo = (courseId) => {
    return mysql.execute(`
    SELECT courseCode, courseName, hours
    FROM studentsTest2.courses
    where courseCode = ?
    ;
    `,[courseId]);
  };

  const getActiveStudent = (studentId) => {
    return mysql.execute(`
    SELECT studentID, firstName,familyName,email, mobileNumber 
    FROM studentsTest2.students
    where status = 1 and studentID = ?
    ;
    `, [studentId]);
  };

const getStudentInfo = (studentId) => {
    return mysql.execute(`
    SELECT firstName, familyName, address, email, mobileNumber
    FROM studentsTest2.students
    where studentID = ?
    ;
    `, [studentId]);
  };

const getAllStudentCourses = (studentId, courseId) => {
    return mysql.execute(`
    SELECT course, examMark 
    FROM studentsTest2.coursesperstudent
    where student = ? and course = ?
    ;
    `, [studentId, courseId]);
  };

  const getAllQustions = () => {
    return mysql.execute(`
    SELECT * FROM studentsTest2.Survey_questions
    order by questions_order
    ;
    `);
  };

  const getAllActiveQustions = (active) => {
    return mysql.execute(`
    SELECT * FROM studentsTest2.Survey_questions
    where status = ?
    order by questions_order
    ;
    `, [active]);
  };

  const getRelatedQustions = (relation) => {
    return mysql.execute(`
    SELECT * FROM studentsTest2.Survey_questions
    where relation = ?
    order by questions_order
    ;
    `, [relation]);
  };

  const getRelatedActiveQustions = (relation, active) => {
    return mysql.execute(`
    SELECT * FROM studentsTest2.Survey_questions
    where relation = ? and status = ?
    order by questions_order
    ;
    `, [relation, active]);
  };

  const getAnonymousType = (id) => {
    return mysql.execute(`
    SELECT * FROM studentsTest2.Survey_questions
    where question_id = ?
    ;
    `, [id]);
  };

  const getAllAnswers = () => {
    return mysql.execute(`
    SELECT * FROM studentsTest2.Survey_answer_types;
    `);
  };

  module.exports.getStudentAttendance = getStudentAttendance;
  module.exports.getCourseInfo = getCourseInfo;
  module.exports.getActiveStudent = getActiveStudent;
  module.exports.getStudentInfo = getStudentInfo;
  module.exports.getAllStudentCourses = getAllStudentCourses;
  module.exports.getAllQustions = getAllQustions;
  module.exports.getAllActiveQustions = getAllActiveQustions;
  module.exports.getRelatedQustions = getRelatedQustions;
  module.exports.getRelatedActiveQustions = getRelatedActiveQustions;
  module.exports.getAnonymousType = getAnonymousType;
  module.exports.getAllAnswers = getAllAnswers;

