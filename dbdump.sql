-- MariaDB dump 10.19  Distrib 10.7.3-MariaDB, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: test
-- ------------------------------------------------------
-- Server version	10.7.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `clout` int(11) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `authorId` int(11) DEFAULT NULL,
  `questionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_328f85639a97f8ff158e0cf7b1f` (`authorId`),
  KEY `FK_a4013f10cd6924793fbd5f0d637` (`questionId`),
  CONSTRAINT `FK_328f85639a97f8ff158e0cf7b1f` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_a4013f10cd6924793fbd5f0d637` FOREIGN KEY (`questionId`) REFERENCES `question` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES
(1,'NOOO, u can\'t use typescript. It\'s slow and bloated!!!11! and it sucks! Use the right eNtErpRisE tOOl!!! https://spring.io/',1,'2022-03-16 09:04:16',1,2);
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answer_vote`
--

DROP TABLE IF EXISTS `answer_vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answer_vote` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` int(11) NOT NULL,
  `userFromId` int(11) DEFAULT NULL,
  `userToId` int(11) DEFAULT NULL,
  `answerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_6de3b6a93ec794b8a3b83b34401` (`userFromId`),
  KEY `FK_c2dc7508df1b82cbd1e308d54ea` (`userToId`),
  KEY `FK_460c2c0f9e9ef5e628133bf1f13` (`answerId`),
  CONSTRAINT `FK_460c2c0f9e9ef5e628133bf1f13` FOREIGN KEY (`answerId`) REFERENCES `answer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_6de3b6a93ec794b8a3b83b34401` FOREIGN KEY (`userFromId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_c2dc7508df1b82cbd1e308d54ea` FOREIGN KEY (`userToId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer_vote`
--

LOCK TABLES `answer_vote` WRITE;
/*!40000 ALTER TABLE `answer_vote` DISABLE KEYS */;
INSERT INTO `answer_vote` VALUES
(1,1,3,1,1);
/*!40000 ALTER TABLE `answer_vote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `text` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `clout` int(11) NOT NULL DEFAULT 0,
  `authorId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_75fc761f2752712276be38e7d13` (`authorId`),
  CONSTRAINT `FK_75fc761f2752712276be38e7d13` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES
(1,'How do I code my SD assignment?','Ok, so i\'m kind of confused on how do i code certain aspects of my SD assigment...','2022-03-15 11:27:39',0,1),
(2,'Is nestjs great?','I heard it\'s good.','2022-03-15 11:33:21',1,1);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_tags_tag`
--

DROP TABLE IF EXISTS `question_tags_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question_tags_tag` (
  `questionId` int(11) NOT NULL,
  `tagIdentifier` varchar(255) NOT NULL,
  PRIMARY KEY (`questionId`,`tagIdentifier`),
  KEY `IDX_fa1cf45c0ee075fd02b0009a0d` (`questionId`),
  KEY `IDX_e3364ceb3c73ba6ef0f1f7031b` (`tagIdentifier`),
  CONSTRAINT `FK_e3364ceb3c73ba6ef0f1f7031b4` FOREIGN KEY (`tagIdentifier`) REFERENCES `tag` (`identifier`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_fa1cf45c0ee075fd02b0009a0d4` FOREIGN KEY (`questionId`) REFERENCES `question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_tags_tag`
--

LOCK TABLES `question_tags_tag` WRITE;
/*!40000 ALTER TABLE `question_tags_tag` DISABLE KEYS */;
INSERT INTO `question_tags_tag` VALUES
(1,'nestjs'),
(1,'SoftwareDesign'),
(2,'nestjs');
/*!40000 ALTER TABLE `question_tags_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_vote`
--

DROP TABLE IF EXISTS `question_vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question_vote` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` int(11) NOT NULL,
  `userFromId` int(11) DEFAULT NULL,
  `userToId` int(11) DEFAULT NULL,
  `questionId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_6943e258f8a0effe35039057e2d` (`userFromId`),
  KEY `FK_f8cde3a78288461d9de0aeda142` (`userToId`),
  KEY `FK_813910b42f15e65b1aac715afd4` (`questionId`),
  CONSTRAINT `FK_6943e258f8a0effe35039057e2d` FOREIGN KEY (`userFromId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_813910b42f15e65b1aac715afd4` FOREIGN KEY (`questionId`) REFERENCES `question` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_f8cde3a78288461d9de0aeda142` FOREIGN KEY (`userToId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_vote`
--

LOCK TABLES `question_vote` WRITE;
/*!40000 ALTER TABLE `question_vote` DISABLE KEYS */;
INSERT INTO `question_vote` VALUES
(1,1,3,1,2);
/*!40000 ALTER TABLE `question_vote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag` (
  `identifier` varchar(255) NOT NULL,
  PRIMARY KEY (`identifier`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES
('nestjs'),
('SoftwareDesign');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_questions_question`
--

DROP TABLE IF EXISTS `tag_questions_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_questions_question` (
  `tagIdentifier` varchar(255) NOT NULL,
  `questionId` int(11) NOT NULL,
  PRIMARY KEY (`tagIdentifier`,`questionId`),
  KEY `IDX_00bb935e36ac218f3007d8c3d9` (`tagIdentifier`),
  KEY `IDX_b5a997e5ac622597bb64a5c604` (`questionId`),
  CONSTRAINT `FK_00bb935e36ac218f3007d8c3d96` FOREIGN KEY (`tagIdentifier`) REFERENCES `tag` (`identifier`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_b5a997e5ac622597bb64a5c6045` FOREIGN KEY (`questionId`) REFERENCES `question` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_questions_question`
--

LOCK TABLES `tag_questions_question` WRITE;
/*!40000 ALTER TABLE `tag_questions_question` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag_questions_question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `role` enum('normal','moderator') NOT NULL DEFAULT 'normal',
  `score` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
(1,'testuser@gmail.com','$2b$10$n2dd/uUzIWAX/VnOBZKO8.RJj45bbpOpJs/R21/ni5e6YW333ueWC','normal',15),
(2,'testmoderator@gmail.com','$2b$10$m2kGTfxlPeT2itDGmJ/Ly.FB4e9xP9wzr8aee0.VGzTwS3fwTHZQ2','moderator',0),
(3,'testotheruser@gmail.com','$2b$10$WWlfUGBerMoeIoyZVJ8nPuLgxqI6GR3hzKoKI.pZAj9plMVkwgCbK','normal',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-16 12:26:07
