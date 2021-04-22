'CREATE TABLE `Survey_results` (
   `id` int NOT NULL AUTO_INCREMENT,
   `course_id` int DEFAULT NULL,
   `date_of_survey` date NOT NULL,
   `question_id` varchar(45) NOT NULL,
   `answer` varchar(45) DEFAULT NULL,
   `student_id` varchar(45) NOT NULL,
   PRIMARY KEY (`id`),
   UNIQUE KEY `id_UNIQUE` (`id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8'