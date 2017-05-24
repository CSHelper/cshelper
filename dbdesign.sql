-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: localhost    Database: dev
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary table structure for view `AssignmentDetails`
--

DROP TABLE IF EXISTS `AssignmentDetails`;
/*!50001 DROP VIEW IF EXISTS `AssignmentDetails`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `AssignmentDetails` AS SELECT 
 1 AS `_id`,
 1 AS `assignerName`,
 1 AS `assignerId`,
 1 AS `assigneeId`,
 1 AS `assigneeName`,
 1 AS `deadline`,
 1 AS `problemId`,
 1 AS `createdAt`,
 1 AS `updatedAt`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Assignments`
--

DROP TABLE IF EXISTS `Assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Assignments` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `deadline` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `assigneeId` int(11) DEFAULT NULL,
  `assignerId` int(11) DEFAULT NULL,
  `problemId` int(11) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `assigneeId` (`assigneeId`),
  KEY `assignerId` (`assignerId`),
  KEY `problemId` (`problemId`),
  CONSTRAINT `Assignments_ibfk_1` FOREIGN KEY (`assigneeId`) REFERENCES `Users` (`_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Assignments_ibfk_2` FOREIGN KEY (`assignerId`) REFERENCES `Users` (`_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Assignments_ibfk_3` FOREIGN KEY (`problemId`) REFERENCES `Problems` (`_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3642 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Codes`
--

DROP TABLE IF EXISTS `Codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Codes` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `language` varchar(20) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `isSuccess` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `problemId` int(11) DEFAULT NULL,
  `isSubmit` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`_id`),
  KEY `userId` (`userId`),
  KEY `problemId` (`problemId`),
  CONSTRAINT `Codes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Codes_ibfk_2` FOREIGN KEY (`problemId`) REFERENCES `Problems` (`_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Compiles`
--

DROP TABLE IF EXISTS `Compiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Compiles` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `tree` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Datasets`
--

DROP TABLE IF EXISTS `Datasets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Datasets` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `inputs` varchar(255) NOT NULL,
  `expectedOutput` varchar(255) NOT NULL,
  `isHidden` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `problemId` int(11) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `problemId` (`problemId`),
  CONSTRAINT `Datasets_ibfk_1` FOREIGN KEY (`problemId`) REFERENCES `Problems` (`_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1796 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `ProblemAttemptViews`
--

DROP TABLE IF EXISTS `ProblemAttemptViews`;
/*!50001 DROP VIEW IF EXISTS `ProblemAttemptViews`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `ProblemAttemptViews` AS SELECT 
 1 AS `_id`,
 1 AS `problemId`,
 1 AS `userId`,
 1 AS `isSuccess`,
 1 AS `attempts`,
 1 AS `title`,
 1 AS `createdAt`,
 1 AS `updatedAt`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Problems`
--

DROP TABLE IF EXISTS `Problems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Problems` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(25) NOT NULL,
  `description` varchar(4000) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Sessions`
--

DROP TABLE IF EXISTS `Sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sid` varchar(255) NOT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sid` (`sid`),
  UNIQUE KEY `Sessions_sid_unique` (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Statistics`
--

DROP TABLE IF EXISTS `Statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Statistics` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `TestViews`
--

DROP TABLE IF EXISTS `TestViews`;
/*!50001 DROP VIEW IF EXISTS `TestViews`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `TestViews` AS SELECT 
 1 AS `_id`,
 1 AS `inputs`,
 1 AS `expectedOutput`,
 1 AS `problemId`,
 1 AS `isHidden`,
 1 AS `createdAt`,
 1 AS `updatedAt`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Tests`
--

DROP TABLE IF EXISTS `Tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tests` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Things`
--

DROP TABLE IF EXISTS `Things`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Things` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TutorStudents`
--

DROP TABLE IF EXISTS `TutorStudents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TutorStudents` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `tutorId` int(11) DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `tutorId` (`tutorId`),
  KEY `studentId` (`studentId`),
  CONSTRAINT `TutorStudents_ibfk_1` FOREIGN KEY (`tutorId`) REFERENCES `Users` (`_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `TutorStudents_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `Users` (`_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2221 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `TutorViews`
--

DROP TABLE IF EXISTS `TutorViews`;
/*!50001 DROP VIEW IF EXISTS `TutorViews`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `TutorViews` AS SELECT 
 1 AS `_id`,
 1 AS `studentName`,
 1 AS `studentEmail`,
 1 AS `studentId`,
 1 AS `tutorId`,
 1 AS `createdAt`,
 1 AS `updatedAt`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `UserCodeViews`
--

DROP TABLE IF EXISTS `UserCodeViews`;
/*!50001 DROP VIEW IF EXISTS `UserCodeViews`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `UserCodeViews` AS SELECT 
 1 AS `_id`,
 1 AS `title`,
 1 AS `userId`,
 1 AS `problemId`,
 1 AS `isSuccess`,
 1 AS `content`,
 1 AS `language`,
 1 AS `createdAt`,
 1 AS `updatedAt`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'user',
  `password` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `facebookId` varchar(255) DEFAULT NULL,
  `googleId` varchar(255) DEFAULT NULL,
  `github` varchar(255) DEFAULT NULL,
  `json` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `Users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=858 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Final view structure for view `AssignmentDetails`
--

/*!50001 DROP VIEW IF EXISTS `AssignmentDetails`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`newuser`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `AssignmentDetails` AS select `a`.`_id` AS `_id`,`u`.`name` AS `assignerName`,`u`.`_id` AS `assignerId`,`u1`.`_id` AS `assigneeId`,`u1`.`name` AS `assigneeName`,`a`.`deadline` AS `deadline`,`a`.`problemId` AS `problemId`,`a`.`createdAt` AS `createdAt`,`a`.`updatedAt` AS `updatedAt` from ((`Users` `u` join `Users` `u1`) join `Assignments` `a`) where ((`u`.`_id` = `a`.`assignerId`) and (`a`.`assigneeId` = `u1`.`_id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `ProblemAttemptViews`
--

/*!50001 DROP VIEW IF EXISTS `ProblemAttemptViews`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`newuser`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `ProblemAttemptViews` AS select `c`.`_id` AS `_id`,`c`.`problemId` AS `problemId`,`c`.`userId` AS `userId`,max(`c`.`isSuccess`) AS `isSuccess`,count(0) AS `attempts`,`p`.`title` AS `title`,`c`.`createdAt` AS `createdAt`,`c`.`updatedAt` AS `updatedAt` from (`Codes` `c` join `Problems` `p`) where ((`p`.`_id` = `c`.`problemId`) and (`c`.`isSubmit` = 1)) group by `c`.`problemId` order by `c`.`userId`,`c`.`createdAt` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `TestViews`
--

/*!50001 DROP VIEW IF EXISTS `TestViews`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`newuser`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `TestViews` AS select `Datasets`.`_id` AS `_id`,`Datasets`.`inputs` AS `inputs`,`Datasets`.`expectedOutput` AS `expectedOutput`,`Datasets`.`problemId` AS `problemId`,`Datasets`.`isHidden` AS `isHidden`,`Datasets`.`createdAt` AS `createdAt`,`Datasets`.`updatedAt` AS `updatedAt` from (`Datasets` join `Problems`) where (`Problems`.`_id` = `Datasets`.`problemId`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `TutorViews`
--

/*!50001 DROP VIEW IF EXISTS `TutorViews`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`newuser`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `TutorViews` AS select `TutorStudents`.`_id` AS `_id`,`Users`.`name` AS `studentName`,`Users`.`email` AS `studentEmail`,`TutorStudents`.`studentId` AS `studentId`,`TutorStudents`.`tutorId` AS `tutorId`,`TutorStudents`.`createdAt` AS `createdAt`,`TutorStudents`.`updatedAt` AS `updatedAt` from (`TutorStudents` join `Users`) where (`TutorStudents`.`studentId` = `Users`.`_id`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `UserCodeViews`
--

/*!50001 DROP VIEW IF EXISTS `UserCodeViews`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`newuser`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `UserCodeViews` AS select `Codes`.`_id` AS `_id`,`Problems`.`title` AS `title`,`Codes`.`userId` AS `userId`,`Codes`.`problemId` AS `problemId`,`Codes`.`isSuccess` AS `isSuccess`,`Codes`.`content` AS `content`,`Codes`.`language` AS `language`,`Codes`.`createdAt` AS `createdAt`,`Codes`.`updatedAt` AS `updatedAt` from (`Codes` join `Problems`) where (`Problems`.`_id` = `Codes`.`problemId`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-23 19:23:02
