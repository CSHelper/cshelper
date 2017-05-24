-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: localhost    Database: CSHelper
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Assignments`
--

LOCK TABLES `Assignments` WRITE;
/*!40000 ALTER TABLE `Assignments` DISABLE KEYS */;
/*!40000 ALTER TABLE `Assignments` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Codes`
--

LOCK TABLES `Codes` WRITE;
/*!40000 ALTER TABLE `Codes` DISABLE KEYS */;
INSERT INTO `Codes` VALUES (58,'python3','a, b = [int(num) for num in input().split()]\n\nprint(a + b)',1,'2017-05-24 01:12:27','2017-05-24 01:12:27',858,7,0),(59,'c','int x = 10, y = 2;\n',0,'2017-05-24 01:15:55','2017-05-24 01:15:55',859,13,0),(60,'c','int x = 10, y = 2;\n',0,'2017-05-24 01:15:58','2017-05-24 01:15:58',859,13,1),(61,'javascript','var x = 10;\nvar y = 2;\n\nconsole.log(x+y)',1,'2017-05-24 01:20:19','2017-05-24 01:20:19',859,13,0),(62,'javascript','var x = 10;\nvar y = 2;\n\nconsole.log(x+y)',1,'2017-05-24 01:20:22','2017-05-24 01:20:22',859,13,1),(63,'javascript','var x = 10\nvar y = 2;\n\nconsole.log(x+y)',1,'2017-05-24 01:20:35','2017-05-24 01:20:35',859,13,1),(64,'javascript','var x = 10\nvar y = 2\n\nconsole.log(x+y)',1,'2017-05-24 01:20:39','2017-05-24 01:20:39',859,13,1),(65,'javascript','var x = 10;\nvar y = 3;\n\nconsole.log(x+y)',0,'2017-05-24 01:21:27','2017-05-24 01:21:27',862,13,1),(66,'javascript','var x = 10;\nvar y = 2;\n\nconsole.log(x+z)',0,'2017-05-24 01:22:04','2017-05-24 01:22:04',863,13,1),(67,'javascript','var x = 10;\nvar y = 2;\n\nconsole.log(x+y)',1,'2017-05-24 01:22:46','2017-05-24 01:22:46',868,13,1),(68,'javascript','var x = 10;\nvar y = 2;\n\nconsole.log(x+y)',1,'2017-05-24 01:23:16','2017-05-24 01:23:16',867,13,1),(69,'python2','var x = 10;\nvar y = 2;\n\nconsole.log(x+y)',0,'2017-05-24 01:23:21','2017-05-24 01:23:21',867,13,1),(70,'c','var x = 10;\nvar y = 2;\n\nconsole.log(x+y)',0,'2017-05-24 01:23:26','2017-05-24 01:23:26',867,13,1),(71,'c','a, b = [int(num) for num in input().split()]\n \nprint(a+b)',0,'2017-05-24 01:28:00','2017-05-24 01:28:00',872,7,0),(72,'c','a, b = [int(num) for num in input().split()]\n \nprint(a+b)',0,'2017-05-24 01:28:18','2017-05-24 01:28:18',872,7,1),(73,'python3','a, b = [int(num) for num in input().split()]\n \nprint(a+b)',1,'2017-05-24 01:28:40','2017-05-24 01:28:40',872,7,1),(74,'python3','a, b = [int(num) for num in input().split()]\n \nprint(a+b)\n',1,'2017-05-24 01:30:43','2017-05-24 01:30:43',874,7,1),(75,'python3','a, b = [int(num) for num in input().split()]\n \nprint(a+b)\n',1,'2017-05-24 01:30:45','2017-05-24 01:30:45',874,7,0),(76,'python3','a, b = [int(num) for num in input().split()]\n \nprint(a+b)\n',1,'2017-05-24 01:30:48','2017-05-24 01:30:48',874,7,1),(77,'python3','a, b = [int(num) for num in input().split()]\n \nprint(a-b)\n',0,'2017-05-24 01:31:33','2017-05-24 01:31:33',876,7,1),(78,'python3','a, b = [int(num) for num in input().split()]\n \nprint(a*b)\n',0,'2017-05-24 01:31:38','2017-05-24 01:31:38',876,7,1),(79,'python3','a, b = [int(num) for num in input().split()]\n \nprint(a/b)\n',0,'2017-05-24 01:31:42','2017-05-24 01:31:42',876,7,1),(80,'python3','a, b = [int(num) for num in input().split()]\n \nprint(a/b)\n',0,'2017-05-24 01:31:44','2017-05-24 01:31:44',876,7,1),(81,'python3','a, b = [int(num) for num in input().split()]\n \nprint(a/b)\n',0,'2017-05-24 01:31:45','2017-05-24 01:31:45',876,7,1),(82,'python3','a, b = [int(num) for num in input().split()]\n \nprint(a/b)\n',0,'2017-05-24 01:31:45','2017-05-24 01:31:45',876,7,1),(83,'python3','a, b = [int(num) for num in input().split()]\n \nprint(a/b)\n',0,'2017-05-24 01:31:45','2017-05-24 01:31:45',876,7,1),(84,'python3','a, b = [int(num) for num in input().split()]\n \nprint(a/b)\n',0,'2017-05-24 01:31:46','2017-05-24 01:31:46',876,7,1),(85,'python3','a, b = [int(num) for num in input().split()]\n \nprint(a/b)\n',0,'2017-05-24 01:31:47','2017-05-24 01:31:47',876,7,1),(86,'python3','a, b = [int(num) for num in input().split()]\n \nprint(a/b)\n',0,'2017-05-24 01:31:49','2017-05-24 01:31:49',876,7,1),(87,'c','a, b = [int(num) for num in input().split()]\n \nprint(b-a)\n',0,'2017-05-24 01:32:40','2017-05-24 01:32:40',878,7,1),(88,'c','a, b = [int(num) for num in input().split()]\n \nprint(b/a)\n',0,'2017-05-24 01:32:43','2017-05-24 01:32:43',878,7,1),(89,'c','a, b = [int(num) for num in input().split()]\n \nprint(b*a)\n',0,'2017-05-24 01:32:48','2017-05-24 01:32:48',878,7,1),(90,'c','a, b = [int(num) for num in input().split()]\n \nprint(a-b)\n',0,'2017-05-24 01:35:57','2017-05-24 01:35:57',879,7,1),(91,'c','a, b = [int(num) for num in input().split()]\n \nprint(a+b)\n',0,'2017-05-24 01:36:01','2017-05-24 01:36:01',879,7,1),(92,'python3','a, b = [int(num) for num in input().split()]\n \nprint(a+b)\n',1,'2017-05-24 01:36:06','2017-05-24 01:36:06',879,7,1),(93,'python3','a, b = [int(num) for num in input().split()]\n \nprint(a+b)\n',1,'2017-05-24 01:39:33','2017-05-24 01:39:33',881,7,1),(94,'c','int a = 2;\nint b = 3;\nprintf(\"%d\", a+b);',0,'2017-05-24 01:40:26','2017-05-24 01:40:26',880,7,0),(95,'c','printf(\"%d\", a+b);',0,'2017-05-24 01:40:41','2017-05-24 01:40:41',880,7,0),(96,'c','printf(\"Hello World\");',0,'2017-05-24 01:40:41','2017-05-24 01:40:41',881,15,1),(97,'c','a, b = [int(num) for num in input().split()]\nprint(a+b)',0,'2017-05-24 01:42:32','2017-05-24 01:42:32',880,7,0),(98,'python3','a, b = [int(num) for num in input().split()]\nprint(a+b)',1,'2017-05-24 01:42:47','2017-05-24 01:42:47',880,7,0),(99,'python3','a, b = [int(num) for num in input().split()]\nprint(a+b)',1,'2017-05-24 01:42:49','2017-05-24 01:42:49',880,7,1),(100,'c','printf(\"Hello World\");',0,'2017-05-24 01:43:50','2017-05-24 01:43:50',881,15,0),(101,'c','printf(\"Hello World\");',0,'2017-05-24 01:43:51','2017-05-24 01:43:51',881,15,1),(102,'c','#include <stdio.h>\n\nint main() {\n   /* my first program in C */\n   printf(\"Hello World\");\n   \n   return 0;\n}\n',0,'2017-05-24 01:44:25','2017-05-24 01:44:25',881,15,1),(103,'c','a, b = [int(num) for num in input().split()]\nprint(a-b)',0,'2017-05-24 01:44:59','2017-05-24 01:44:59',880,14,0),(104,'python3','a, b = [int(num) for num in input().split()]\nprint(a-b)',1,'2017-05-24 01:45:05','2017-05-24 01:45:05',880,14,0),(105,'python3','a, b = [int(num) for num in input().split()]\nprint(a-b)',1,'2017-05-24 01:45:08','2017-05-24 01:45:08',880,14,1),(106,'c','printf(\"Yes\\nYes\\nNo\");',0,'2017-05-24 01:47:39','2017-05-24 01:47:39',879,8,1),(107,'python3','print(true)',1,'2017-05-24 01:48:11','2017-05-24 01:48:11',880,8,0),(108,'c','printf(\"Else If\");',0,'2017-05-24 01:48:12','2017-05-24 01:48:12',879,10,1),(109,'python3','print(true)',0,'2017-05-24 01:48:13','2017-05-24 01:48:13',880,8,1),(110,'c','printf(\"Else If\");',0,'2017-05-24 01:49:45','2017-05-24 01:49:45',879,10,0),(111,'c','var x = 10\nvar y = 2\n\nconsole.log(x+y)',0,'2017-05-24 01:52:05','2017-05-24 01:52:05',879,13,1),(112,'javascript','var x = 10\nvar y = 2\n\nconsole.log(x+y)',1,'2017-05-24 01:52:09','2017-05-24 01:52:09',879,13,1),(113,'javascript','var x = 7\nvar y = 10.8\nvar z = \'h\'\n\nconsole.log(x)\nconsole.log(y)\nconsole.log(z)',0,'2017-05-24 01:53:21','2017-05-24 01:53:21',879,11,1),(114,'javascript','var x = 10;\nvar y = 2;\n\nconsole.log(x+y)',1,'2017-05-24 01:55:44','2017-05-24 01:55:44',878,13,1),(115,'c','var x = 10;\nvar y = 2;\n\nconsole.log(x-y)',0,'2017-05-24 01:56:07','2017-05-24 01:56:07',876,13,1),(116,'c','var x = 10;\nvar y = 2;\n\nconsole.log(x*y)',0,'2017-05-24 01:56:11','2017-05-24 01:56:11',876,13,1),(117,'c','var x = 10;\nvar y = 2;\n\nconsole.log(x/y)',0,'2017-05-24 01:56:15','2017-05-24 01:56:15',876,13,1),(118,'c','var x = 10;\nvar y = 2;\n\nconsole.log(x-y)',0,'2017-05-24 01:57:13','2017-05-24 01:57:13',874,13,1),(119,'c','var x = 10;\nvar y = 2;\n\nconsole.log(x+y)',0,'2017-05-24 01:57:17','2017-05-24 01:57:17',874,13,1),(120,'c','var x = 10;\nvar y = 2;\n\nconsole.log(x+y)',0,'2017-05-24 01:57:20','2017-05-24 01:57:20',874,13,1),(121,'c','var x = 10;\nvar y = 2;\n\nconsole.log(x+y)',0,'2017-05-24 01:57:23','2017-05-24 01:57:23',874,13,1),(122,'c','var x = 10;\nvar y = 2;\n\nconsole.log(x+y)',0,'2017-05-24 01:57:24','2017-05-24 01:57:24',874,13,0),(123,'c','var x = 10;\nvar y = 2;\n\nconsole.log(x+y)',0,'2017-05-24 01:57:26','2017-05-24 01:57:26',874,13,1),(124,'javascript','var x = 10;\nvar y = 2;\n\nconsole.log(x+y)',1,'2017-05-24 01:57:31','2017-05-24 01:57:31',874,13,1),(125,'javascript','console.log(7)\nconsole.log(10.8)\nconsole.log(h)',0,'2017-05-24 01:59:36','2017-05-24 01:59:36',872,11,1),(126,'python2','console.log(7)\nconsole.log(10.8)\nconsole.log(h)',0,'2017-05-24 01:59:49','2017-05-24 01:59:49',872,11,1);
/*!40000 ALTER TABLE `Codes` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `Compiles`
--

LOCK TABLES `Compiles` WRITE;
/*!40000 ALTER TABLE `Compiles` DISABLE KEYS */;
/*!40000 ALTER TABLE `Compiles` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=1813 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Datasets`
--

LOCK TABLES `Datasets` WRITE;
/*!40000 ALTER TABLE `Datasets` DISABLE KEYS */;
INSERT INTO `Datasets` VALUES (1796,'2 3','5',0,'2017-05-24 00:02:14','2017-05-24 00:02:14',7),(1797,'7 9','16',0,'2017-05-24 00:02:14','2017-05-24 00:02:14',7),(1798,'89 56','145',0,'2017-05-24 00:02:14','2017-05-24 00:02:14',7),(1799,'8946 56894','65840',1,'2017-05-24 00:02:14','2017-05-24 00:02:14',7),(1800,'1 1','2',1,'2017-05-24 00:02:14','2017-05-24 00:02:14',7),(1801,'4 6','10',1,'2017-05-24 00:02:14','2017-05-24 00:02:14',7),(1802,'5','Yes\\nYes\\nNo',1,'2017-05-24 00:48:23','2017-05-24 00:48:23',8),(1803,'5','No\\nNo\\nYes',1,'2017-05-24 00:59:23','2017-05-24 00:59:23',9),(1804,'5','Else If',1,'2017-05-24 01:00:07','2017-05-24 01:00:07',10),(1805,'5 1.39 b','5\\n1.39\\nb\\n',0,'2017-05-24 01:02:55','2017-05-24 01:02:55',11),(1806,'7 10.8 h','7\\n10.8\\nh\\n',1,'2017-05-24 01:02:55','2017-05-24 01:02:55',11),(1807,'false 1980.5321 534890067145276','false\n1980.5321\n534890067145276',1,'2017-05-24 01:08:55','2017-05-24 01:08:55',12),(1808,'10 2','12',1,'2017-05-24 01:14:14','2017-05-24 01:14:14',13),(1809,'6 4','2',0,'2017-05-24 01:14:36','2017-05-24 01:14:36',14),(1810,'50 30','20',1,'2017-05-24 01:14:36','2017-05-24 01:14:36',14),(1811,'9 3','6',1,'2017-05-24 01:14:36','2017-05-24 01:14:36',14),(1812,'5','Hello World',1,'2017-05-24 01:21:47','2017-05-24 01:21:47',15);
/*!40000 ALTER TABLE `Datasets` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Problems`
--

LOCK TABLES `Problems` WRITE;
/*!40000 ALTER TABLE `Problems` DISABLE KEYS */;
INSERT INTO `Problems` VALUES (7,'Addition','Write a simple program that add two number together\n\nSample input:\n```\n2 3\n```\n\nExpected output:\n\n```\n5\n```','2017-05-24 00:02:14','2017-05-24 00:02:14'),(8,'Conditionals','## Conditionals\n \n### 1.1 Lesson\n \n \n* Conditionals are used to check if a requirement has been met.  If the condition you\'re checking is/becomes true, an action will be performed.\n \n \n**Example**\n \n``` java\nint a = 5;\nif (a == 5){\n    System.out.println(\"If statement is true!\");\n}\n```\nThe above example is a simple **If Statement** that checks if **a** is equal to **5**.\n \n* Below are the relational and equality operators you can use in a **Conditional Statement**.\n```\n==  	equal to\n!=  	not equal to\n>   	greater than\n>=  	greater than or equal to\n<   	less than\n<=  	less than or equal to\n&&     conditional AND conditional\n||     conditional OR conditional\n```\n### 1.2 Instructions\n1. In the code editor, declare an **integer** variable named ```a```, then set it to ```5```.\n2. Code an **If Statement** to check if ```a is equal to 5```. If it is, please print out \"Yes\". If it isn\'t, print out \"No\".\n3. Declare a variable ```b``` and set it to the value ```3```.\n4. Write an **If Statement** to check if ```a + b is equal to 8```.  If it does, please print out \"Yes\". If not,  print out \"No\".\n5. Lastly, using an **If Statement**, check if ```a * b is equal to 10```. If true, print out \"Yes\". If not, print \"No\".','2017-05-24 00:48:23','2017-05-24 00:48:23'),(9,'Conditionals 2','### 1.1 Lesson\n \n \n* The typical conditional statement contains an **If Statement**.  If we want to be able to perform an operation if the statement isn\'t true, we use an **Else Statement**.\n \n \n**Example**\n \n``` java\nint a = 5;\nif (a == 4){\n    System.out.println(\"If statement is true!\");\n}\nelse {\n    System.out.println(\"If statement is NOT true!\");\n}\n```\nThe above example is a simple **If Statement** that checks if **a** is equal to **5**.\n \nThe same relational and equality operators are used.\n```\n==  	equal to\n!=  	not equal to\n>   	greater than\n>=  	greater than or equal to\n<   	less than\n<=  	less than or equal to\n&&     conditional AND conditional\n||     conditional OR conditional\n```\n### 1.2 Instructions\n1. In the code editor, declare an **integer** variable named ```X```, then set it to ```10```.\n2. Code an **If Statement** to check if ```X is equal to 9```. If it is, please print out \"Yes\". If it isn\'t, print out \"No\".\n3. Declare a variable ```Y``` and set it to the value ```5```.\n4. Write an **If Statement** to check if ```X + Y is equal to 9```.  If it does, please print out \"Yes\". If not,  print out \"No\".\n5. Lastly, using an **If Statement**, check if ```X * Y is equal to 45```. If true, print out \"Yes\". If not, print \"No\".','2017-05-24 00:59:23','2017-05-24 00:59:23'),(10,'Conditionals 3','### 1.1 Lesson\n \n \n* Now that we\'ve learned what an **If Statement** and **Else Statement** are, we need to talk about **Else If Statements**.  \n* The reason for an **Else If Statement** is to check multiple cases at once, with the only possiblity of one being correct.\n \n \n**Example**\n \n``` java\nint a = 5;\nint b = 4;\nif (a + b == 1){\n    System.out.println(\"a + b is equal to 1!\");\n}\nelse if (a - b == 1){\n    System.out.println(\"a - b is equal to 1!\");\n}\nelse {\n    System.out.println(\"Neither statements are true!\");\n}\n```\nThe above example is checking to see if ```a + b``` or ```a - b``` is equal to ```1```.\n \nThe same relational and equality operators are available.\n```\n==  	equal to\n!=  	not equal to\n>   	greater than\n>=  	greater than or equal to\n<   	less than\n<=  	less than or equal to\n&&     conditional AND conditional\n||     conditional OR conditional\n```\n### 1.2 Instructions\n1. In the code editor, declare an **integer** variable named ```q``` and set it to ```15```. Then create another **integer** ```w``` and set it to ```5```.\n2. Using an **If, Else, and Else If Statement** determine if ```q - w, q / w, or q  + w is equal to 3```.\n3. If it stands true for If, print out \"If\". For else if print, \"Else If\", and for Else print, \"Else\".','2017-05-24 01:00:07','2017-05-24 01:00:07'),(11,'Primitive Data Types','### 1.1 Lesson\n \nA variable is a named memory location that stores a value.  Each variable has a type that determines what kind of values it can store.  All variables must be declared before they can be used.\n \nA data type is a classification of data.  Each type has determined values which it can take and certain operations which can be performed.\n \nPrimitive data types are the basic data types of most programming languages.  They contain simple values of a certain kind.  They have predefined operations which you cannot modify.\n \n**Example**\n \n``` java\nint myInt = 5;\ndouble mcDouble = 1.39;\nchar myChar = \'b\';\n```\n \n### 1.2 Instructions\n \n1. In the code editor declare a variable of type integer and initialize it with the value `7`.\n2. Declare a variable of type double and initialize it with the value `10.8`.\n3. Declare a variable of type char and initialize it with the value `h`.\n4. Print out all three individual variables on separate lines.\n \n \n**Sample Output**\n``` \n5\n1.39\nb\n```','2017-05-24 01:02:55','2017-05-24 01:02:55'),(12,'Primitive Data Types 2','### 1.1 Lesson\n \nA variable is a named memory location that stores a value.  Each variable has a type that determines what kind of values it can store.  All variables must be declared before they can be used.\n \nA data type is a classification of data.  Each type has determined values which it can take and certain operations which can be performed.\n \nPrimitive data types are the basic data types of most programming languages.  They contain simple values of a certain kind.  They have predefined operations which you cannot modify.\n \n**Example**\n \n``` java\nboolean isBear = true;\nfloat myFloat = 142.893;\nlong myLong = -89372036430807563;\n```\n \n### 1.2 Instructions\n \n1. In the code editor declare a variable of type boolean and initialize it with the value `false`.\n2. Declare a variable of type float and initialize it with the value `1980.5321`.\n3. Declare a variable of type long and initialize it with the value `534890067145276`.\n4. Print out all three individual variables on separate lines.\n \n \n**Sample Output**\n``` \ntrue\n142.893\n-89372036430807563\n```','2017-05-24 01:08:55','2017-05-24 01:08:55'),(13,'Arithmetic Operators','### 1.1 Lesson\n \nArithmetic operators in programming are usually the same that are found in mathematical expressions (+ - * / % ++ --).  Often, programming languages have operator precedence rules such as found in algebra (multiplication and division before addition and subtraction).  These rules can be overridden with parentheses.\n \n**Example**\n \n``` java\nint x = 20;\nint y;\ny = 5 + x;\n```\n \n### 1.2 Instructions\n \n1. In the code editor declare a variable of type int and initialize it with the value `10`.\n2. Declare another variable of type int and initialize it with the value `2`.\n4. Print out the sum of the first and second variables that you created.\n \n \n**Sample Output**\n``` \n25\n```','2017-05-24 01:14:14','2017-05-24 01:14:14'),(14,'Subtraction','Write a simple program that finds the difference between two numbers.\nSample input:\n``` \n5 4\n``` \nExpected output:\n``` \n1\n```','2017-05-24 01:14:36','2017-05-24 01:14:36'),(15,'Print Statements','### 1.1 Lesson\n \n \n* Print Statements are a way outputing characters to a console for a user to view.\n\n### 1.2 Instructions\n1. In the code editor create a public class named myFirstClass.\n2. Within the myFirstClass create a main() method.\n3. Inside the main() method create an output statement to print the literal “Hello World” using System.out.println.\n\n**Example**\n``` java\npublic class className {\n\n   public static void main(String []args) {\n		System.out.println(\"Welcome To The Computer Science Helper.\");\n   }\n}\n```','2017-05-24 01:21:47','2017-05-24 01:21:47');
/*!40000 ALTER TABLE `Problems` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sessions`
--

LOCK TABLES `Sessions` WRITE;
/*!40000 ALTER TABLE `Sessions` DISABLE KEYS */;
INSERT INTO `Sessions` VALUES (73,'73d70FMyW20_-KUr_TPz_kv2q8nw2LL6','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"_csrfSecret\":\"1H8HpH+vVGqpNw==\"}','2017-05-23 23:55:34','2017-05-23 23:55:34'),(74,'dOAjOIUV_ATFNTwKCA6LqW7iYGo9MfDy','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"_csrfSecret\":\"+Zluo6M3T6/wVg==\"}','2017-05-24 00:16:20','2017-05-24 00:16:20'),(75,'DBkAR1o38fZf02rhcbyNd6qBMZy_mq_X','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"_csrfSecret\":\"Frc0Txw60sv+lg==\"}','2017-05-24 00:19:58','2017-05-24 00:19:58'),(76,'PqfFHT_FEcstQdYZmrQcFOGz3OVJptYU','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"_csrfSecret\":\"XkIkJDjfm4zF9Q==\"}','2017-05-24 00:27:56','2017-05-24 00:27:56'),(77,'KjAMlr1ash6wxPr--mX8wZ10e5lW3ULT','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"_csrfSecret\":\"RwlDn0q745YGbw==\"}','2017-05-24 00:30:32','2017-05-24 00:30:32'),(78,'hTQ8-8yxDJl_UuQ2uAdikVszhArpDc_k','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"_csrfSecret\":\"LoJPCFzbG1T8UA==\"}','2017-05-24 00:40:37','2017-05-24 00:40:37');
/*!40000 ALTER TABLE `Sessions` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `Statistics`
--

LOCK TABLES `Statistics` WRITE;
/*!40000 ALTER TABLE `Statistics` DISABLE KEYS */;
/*!40000 ALTER TABLE `Statistics` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `Tests`
--

LOCK TABLES `Tests` WRITE;
/*!40000 ALTER TABLE `Tests` DISABLE KEYS */;
/*!40000 ALTER TABLE `Tests` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `Things`
--

LOCK TABLES `Things` WRITE;
/*!40000 ALTER TABLE `Things` DISABLE KEYS */;
/*!40000 ALTER TABLE `Things` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TutorStudents`
--

LOCK TABLES `TutorStudents` WRITE;
/*!40000 ALTER TABLE `TutorStudents` DISABLE KEYS */;
/*!40000 ALTER TABLE `TutorStudents` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=891 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (858,'Nghia Tran','nghiattran3@gmail.com','admin','NNFamWhdQ2R9OAA8fT3tuat3fbC9iNH2n8pEsnmVSp858ls5ckfjDAxjio76sUxahGBOEJe93d6myls4kvEd2Q==','local','c1+l1wzdMtAR0aYQ698GPg==',NULL,NULL,NULL,NULL,'2017-05-23 23:56:23','2017-05-23 23:56:23'),(859,'Tommy Shay','tshay1@gulls.salisbury.edu','admin','wm9Uws24gnqhvRTBD54C8hSOrbN5RjKL0lcVRk1W2noAsxf9g/V3M5t+maGnV/eJz0XWgEVSe581oqeIv+SLVA==','local','1hUf1cEhXmQeFVnK0STP7w==',NULL,NULL,NULL,NULL,'2017-05-24 00:20:09','2017-05-24 00:20:09'),(860,'Sarah Watson','swatson567@gmaila.com','admin','a1/TfwVXWzpIk8MuRP5VKtswcLtikM4eSVnWDFW7DI23em9CeEEeD5Nrs71VH6TLYmBhSWUC5lwORWqfFgee5A==','local','FksyeBwdIAak6v6U+HIg5Q==',NULL,NULL,NULL,NULL,'2017-05-24 00:23:05','2017-05-24 00:23:05'),(861,'Jicardo Guarcia','JicardoGuarcia@mail.com','student','7d+8jKqHt4tXIngb87WbGWdWzgpCkINN2zBiMrPlVIHmZ9tWaHGIHf6sNKQowLknBhyAAojg/wTgnbjKMriyXA==','local','97d2XjJWtRaZVDuB1lGvoQ==',NULL,NULL,NULL,NULL,'2017-05-24 00:26:58','2017-05-24 00:26:58'),(862,'Bob Builder','BobBuilder@mail.com','student','LVCqdroFM1SaOK1tWFfw4Jjl2uOjiqmakoyVD++Lh5QG5xlcQBvgzloylUau5cZpPfUxpHvmSjkra323hWi2vQ==','local','UxpOXWTQbO/TilUFegR9Mw==',NULL,NULL,NULL,NULL,'2017-05-24 00:27:28','2017-05-24 00:27:28'),(863,'Sam Butler','SamButler@mail.com','student','RALqJu8gSKIpJs7T7XT0Hx0IuNvi2QfrC+6YfkEFp5tr6tNCf9j9pL0hcUhBa653gif012TZzkTa+e9qgVLLQQ==','local','5830T4mWvz9aAB2OBOtLpA==',NULL,NULL,NULL,NULL,'2017-05-24 00:28:00','2017-05-24 00:28:00'),(864,'Maliq Johnson','MaliqJohnson@mail.com','student','2dP9ees39Dfp8RMguKEVDpFIeNLacw8EW6zjXb6ivEZ56pNn2NlM2tSs/BYBifEU8715Bvti2b1nm6pCovxn4w==','local','ZdO5o7bTttQ23b2UFiVnSw==',NULL,NULL,NULL,NULL,'2017-05-24 00:28:43','2017-05-24 00:28:43'),(865,'Shawn Smith','ShawnSmith@mail.com','student','WwWGT1fOauB4eafkIIG+o7REocmfiNWLCyn6an65Lj/2X3PiS5BsMyrxuyPymp017oxDBQ2j+VUC1vC5og3NBg==','local','LfpXYazG7iY1A834HUVwwA==',NULL,NULL,NULL,NULL,'2017-05-24 00:29:07','2017-05-24 00:29:07'),(866,'Carson Fields','eliteyeet@gmaila.com','student','4QfgpJIo616bIfjci5W8ISlwny18o/xUxF1BbN+lq6sB4VnX6+YqF0u9VLU7Jt+QNUABNwraOYLjUfr4iHUyFg==','local','sJ6XHBEM8sWEcfX10KHXNg==',NULL,NULL,NULL,NULL,'2017-05-24 00:29:26','2017-05-24 00:29:26'),(867,'Amy Shumer','AmyShumer@mail.com','student','kVlLP/0s3unVNqclqAmMryIMuTWw41bwRokVAEJd9LqO17OjfwiwF5/xcVHcxIuOsbeT0INC+928k5ZIqIYKKQ==','local','/FUbdE8Reb3wWbC2Byf8/Q==',NULL,NULL,NULL,NULL,'2017-05-24 00:29:29','2017-05-24 00:29:29'),(868,'Jake Shady','JakeShady@mail.com','student','ZV3PmJr9x2DJwzY1XJE5Cw9jGIaLdvtYwdV3AtJZwz5kJK9XDgvKrDo7rYblUP3wtXbT3PAvxv+/y2PO95sD3w==','local','oRSrBN48c6oFoXo4kFkPWA==',NULL,NULL,NULL,NULL,'2017-05-24 00:29:51','2017-05-24 00:29:51'),(871,'Josh Kempter','JoshKempter@mail.com','student','jphxO0nTvfTu3Bdk5eVHHGUjJgRVuMrY8MH1qzdh9+WCg+AQ/mdyqP/XHLa/mBV9fqT/74eOHGefE6tclZx8EQ==','local','gEpaUJ8wX6plKJ4sMzL26Q==',NULL,NULL,NULL,NULL,'2017-05-24 00:30:15','2017-05-24 00:30:15'),(872,'Swan Lee','swanlee@mail.com','student','6+SVdScOeKm28LoRi6IOI0qaEY9BEOnvYfYkRh6/5TAVy1ioOzABsMYflUUIM7AJZz8H+mTVVZTk5ycg9BCMVg==','local','m5LNlYlztV7IQtDUEexbvg==',NULL,NULL,NULL,NULL,'2017-05-24 00:30:39','2017-05-24 00:30:39'),(873,'Cody Flip','CodyFlip@mail.com','student','VYH6mSzKUzjkqDen6i3on0RIZ/61LxPJ6i+GK/B6zjCbmQDiCPJUQAZZYSf8t6JnaEWTMOOdA+kgDqLbG86Afg==','local','tfvMLaGOP7eEfUG6Nm0JXg==',NULL,NULL,NULL,NULL,'2017-05-24 00:30:44','2017-05-24 00:30:44'),(874,'Ming Chao','mingchao@mail.com','student','ystY7oJ06u1rFPENqryOoUt9iFAIZoydRyxm1BpEvp0uH40ilPsWqUp0beG24tu/84FEZB0/NEFL+eqTrL15HQ==','local','yiL/RBEGPzL7lov0oNUdJw==',NULL,NULL,NULL,NULL,'2017-05-24 00:31:07','2017-05-24 00:31:07'),(875,'Adam Lou','AdamLou@mail.com','student','JoeJjVliQJsbenl4ruE9HPVcFUjPHmdsae60I7fv0qIc3SkuISYsigS4GfckhQjG7uXEWytojGrwCeur6vxdvw==','local','Ci76jOXIqsRoA630KCkrqQ==',NULL,NULL,NULL,NULL,'2017-05-24 00:31:13','2017-05-24 00:31:13'),(876,'Bahl Yung','bahlyung@mail.com','student','dzk0AzihPIZg9R/tEurJ90PgUW94bCpXY2hSYTXG0+ZJ/szo4K5Ofg1YWPRkRczM6UUUYIMsKutwOUtB2/xWQA==','local','kNpgj3wEFnctC20NJL65/Q==',NULL,NULL,NULL,NULL,'2017-05-24 00:31:31','2017-05-24 00:31:31'),(877,'Michael Hukal','MHukal@gmail.com','student','mbrb0pYJCzA35U6LJ19T1sgt41ZZ1MgK7UKTME9cC1I0M5DhPI6Xj0Kxzx8ldCkEFJPJMK+0qrOG1DfmeLCN+Q==','local','GSKYZkP07ijwBeAfMiTg7Q==',NULL,NULL,NULL,NULL,'2017-05-24 00:31:38','2017-05-24 00:31:38'),(878,'Marshall Mathers','marshallmathers@mail.com','student','qXxUWlGl1NAa8LTaqVlufy7SAQH+ls7H62YtyLkcrVAzfq85RYz6hhhZNuf7MXlEFqUYz0SVeyIRfBnY8tYi7w==','local','XlOYDlA90s9zFE//liIFXg==',NULL,NULL,NULL,NULL,'2017-05-24 00:31:55','2017-05-24 00:31:55'),(879,'Traina Tupaka','trainatupaka@mail.com','student','lYZeDiz1Pxb0FYYcpyLn2hbA2P6dqr/nPRsZ4/yBP5L0bqKHLizYfshMSJdgzZ45J2KR+fUspgtCt4QFu4vsBA==','local','BHsGLD2UbxWbE4kodVcNZA==',NULL,NULL,NULL,NULL,'2017-05-24 00:32:21','2017-05-24 00:32:21'),(880,'Han Furz','HFurz@gmail.com','admin','9ncBx1Qmz1bjTvgYkO6J76IzXSIolExATmYAOMCP+95XutAeBvy/fEyfHPnN24PryFrG4iscVwe9vKdm8ZXvDw==','local','8OGP53+MH9Au4GLTOPDIzA==',NULL,NULL,NULL,NULL,'2017-05-24 00:32:24','2017-05-24 00:32:24'),(881,'Ling Hao','linghao@mail.com','student','/0VWPfZa+I9Hx2LJ0EQWvG/9kiMqFuPf3hGeWa0e+AMnzuswgn+YOUCMCEvaEo3e1SamhmgQhAy5oRK24tiVWw==','local','xS/i4qBsI6Pv+IU/0AF+XA==',NULL,NULL,NULL,NULL,'2017-05-24 00:32:41','2017-05-24 00:32:41'),(882,'Brandon Essix','BEssix@gmail.com','student','StwVvW3Qh7716pJf+CejWBlo1UsgwO2J/a/bIukTpslxCEQc5caT6v2ZG+oCzNgBKoEe8kaqFdVBybr31612Eg==','local','TreccIc2/PT0beKPaLXmHw==',NULL,NULL,NULL,NULL,'2017-05-24 00:33:03','2017-05-24 00:33:03'),(883,'Samantha Jupiz','SJupiz@gmail.com','student','Lh1lXWR7r0/cBGFwVF1N8zeT/zJkTbjH/7vU0yH+d95B4A9cCejFEOHdyZ+Jw7WNrJc+pCLUEv2hJEn3u9nUZg==','local','WYzC1C2kpvJEjYvh1BYEbA==',NULL,NULL,NULL,NULL,'2017-05-24 00:33:35','2017-05-24 00:33:35'),(884,'CJ Tohz','CTohz@gmail.com','student','RmzUXs4diWAOf+YJ2NMEOltdPN04JpfLubFQwdxokctu+h3qn9FPhXZu54QwZ1ZgNPlSUrle0qYuBzGbn3h0Lw==','local','kbfpu6B2YGItJp9LDOpyog==',NULL,NULL,NULL,NULL,'2017-05-24 00:34:20','2017-05-24 00:34:20'),(885,'Andy Hanson','AHanson@gmail.com','student','QH7vBrg+7IQu0hT9G5lORMcJMDjXjf6CcjvsYUQjjsfNyh6ma6+ftATt9vFBz3WfhDLtHguKGCJc0bsRib90fw==','local','MrksrdyrBGkvz71CxMA6tA==',NULL,NULL,NULL,NULL,'2017-05-24 00:34:51','2017-05-24 00:34:51'),(886,'Dillon Gossarth','DGossarth@gmail.com','student','dhL6iP8mLamF32RgVV1EPYtcJJ3Meca58/r56YZDm8k34sVwhZ2Y8sEebTbCiafduZzvZNUPWGyggyX1nC637Q==','local','XKqBjhVvMwmnOk9+H4Is/g==',NULL,NULL,NULL,NULL,'2017-05-24 00:35:20','2017-05-24 00:35:20'),(887,'Taylor Bradford','TBradford@gmail.com','student','uZ7aubRIZW13I5u5YyMohIOdHctzNAZv7XpScqzMDwBYxxBDO10klXqfLfnEtFKp9FtYLQznBrEBr/kBZ+2qWQ==','local','igTZtq6Nb1uCoEZncAno9A==',NULL,NULL,NULL,NULL,'2017-05-24 00:35:46','2017-05-24 00:35:46'),(888,'Justin Swinson','JSwinson@gmail.com','student','G5RHFB7WQFOHzfhDzpuFTzSalbm4aUeOg9jkP7dXV+lfibyvgxBwW36++LLCuZ79u+lt5VKOcSZxMBnSfFb+Vw==','local','na+PKXHq4YRMzJB4f9QcbA==',NULL,NULL,NULL,NULL,'2017-05-24 00:36:55','2017-05-24 00:36:55'),(889,'Khaled Wayne','KWayne@gmail.com','student','DOGHeN5Jz9fPnRAcnxQBibHfDf18Y5I/S0Scex45SXh7wSfblo/tByPW8sn5GOIYwNClMEelznuYYTarfqlfZw==','local','ZDHWdU00Jvhd7ZkM8rnz4Q==',NULL,NULL,NULL,NULL,'2017-05-24 00:37:30','2017-05-24 00:37:30'),(890,'Barry Swiss','BSwiss@gmail.com','student','J1UUHjSzAyOJTkEuBCNojnPqwvx20N4/BW063cSwxCvUNsCEiN8JCAGYFD0apX88SYxHn5k0JX5sI2vEedN5zA==','local','5SDT+WXPM/0RKQKla/8u2Q==',NULL,NULL,NULL,NULL,'2017-05-24 00:38:11','2017-05-24 00:38:11');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

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
/*!50001 VIEW `ProblemAttemptViews` AS select `c`.`_id` AS `_id`,`c`.`problemId` AS `problemId`,`c`.`userId` AS `userId`,max(`c`.`isSuccess`) AS `isSuccess`,count(0) AS `attempts`,`p`.`title` AS `title`,`c`.`createdAt` AS `createdAt`,`c`.`updatedAt` AS `updatedAt` from (`Codes` `c` join `Problems` `p`) where ((`p`.`_id` = `c`.`problemId`) and (`c`.`isSubmit` = 1)) group by `c`.`problemId`,`c`.`userId` order by `c`.`userId`,`c`.`createdAt` */;
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

-- Dump completed on 2017-05-24  3:26:56
