'CREATE TABLE `Survey_questions` (
   `question_id` int NOT NULL AUTO_INCREMENT,
   `questions` varchar(5000) NOT NULL,
   `relation` varchar(45) DEFAULT 'all',
   `answer_type` int DEFAULT '1',
   `Anonymous` int DEFAULT '0',
   `questions_order` int NOT NULL,
   `time_stamp` date DEFAULT NULL,
   `status` varchar(45) NOT NULL DEFAULT 'active',
   PRIMARY KEY (`question_id`),
   UNIQUE KEY `question_id_UNIQUE` (`question_id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8'

--  show create table studentsTest2.Survey_questions;