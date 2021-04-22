const mysql = require("./mysqlPool");

const insertResults = (studentId, question_id,course_id,answer) => {
    return mysql.execute(`
    INSERT INTO studentsTest2.Survey_results(student_id, question_id,course_id,answer, date_of_survey)
    VALUES(?,?,?,?,now());`,
    [studentId, question_id,course_id,answer]);
  };

  module.exports.insertResults = insertResults;