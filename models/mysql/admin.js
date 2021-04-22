const mysql = require("./mysqlPool");

const findAdmin = (adminId) => {
    return mysql.execute(`
    SELECT * FROM studentsTest2.students
    where role = 2000 and email = ?
    ;`,
    [adminId]);
  };

const getQuestionInfo = (id) => {
    return mysql.execute(`
    SELECT * FROM studentsTest2.Survey_questions
    where question_id = ?
    ;`,
    [id]);
  };

const addQuestion = (questions, relation,answer_type, Anonymous,questions_order) => {
    return mysql.execute(`
    INSERT INTO studentsTest2.Survey_questions
    (questions, relation,answer_type, Anonymous,questions_order,time_stamp)
    VALUES(?,?,?,?,?,now())
    ;`,
    [questions, relation,answer_type, Anonymous,questions_order]);
};

const editQuestion = (questions, relation,answer_type, Anonymous,questions_order,status,question_id) => {
    return mysql.execute(`
    UPDATE studentsTest2.Survey_questions
    SET questions = ?, relation =?, answer_type = ?, Anonymous = ?, questions_order = ?,status = ?, time_stamp = now()
    WHERE question_id = ?
    ;`,
    [questions, relation,answer_type, Anonymous,questions_order,status,question_id]);
};

const deleteQuestion = (question_id) => {
    return mysql.execute(`
    UPDATE studentsTest2.Survey_questions
    SET status = 'non-active', time_stamp = now()
    WHERE question_id = ?
    ;`,
    [question_id]);
};

const addAnswers = (answer_type, answer) => {
    return mysql.execute(`
    INSERT INTO studentsTest2.Survey_answer_types
    (answer_type, answer)
    VALUES(?,?)
    ;`,
    [answer_type, answer]);
};

const editAnswerOption = (answer, id) => {
    return mysql.execute(`
    UPDATE studentsTest2.Survey_answer_types
    SET answer = ?
    WHERE id = ?
    ;`,
    [answer, id]);
};

const deleteAnswerOption = ( id) => {
    return mysql.execute(`
    DELETE FROM studentsTest2.Survey_answer_types
    WHERE id = ?
    ;`,
    [ id]);
};

  module.exports.findAdmin = findAdmin;
  module.exports.getQuestionInfo = getQuestionInfo;
  module.exports.addQuestion = addQuestion;
  module.exports.editQuestion = editQuestion;
  module.exports.deleteQuestion = deleteQuestion;
  module.exports.addAnswers = addAnswers;
  module.exports.editAnswerOption = editAnswerOption;
  module.exports.deleteAnswerOption = deleteAnswerOption;

