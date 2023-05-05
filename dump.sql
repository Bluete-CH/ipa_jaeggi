-- MariaDB dump 10.19  Distrib 10.4.21-MariaDB, for osx10.10 (x86_64)
--
-- Host: localhost    Database: ipa
-- ------------------------------------------------------
-- Server version	10.4.21-MariaDB

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
-- Table structure for table `tbl_parking_spot`
--

DROP TABLE IF EXISTS `tbl_parking_spot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_parking_spot` (
  `parking_spot_id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `number` int(11) NOT NULL,
  `charger_available` tinyint(1) NOT NULL DEFAULT 0,
  `unavailable` tinyint(1) NOT NULL DEFAULT 0,
  `unavailability_reason` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`parking_spot_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_parking_spot`
--

LOCK TABLES `tbl_parking_spot` WRITE;
/*!40000 ALTER TABLE `tbl_parking_spot` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_parking_spot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_reservation`
--

DROP TABLE IF EXISTS `tbl_reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_reservation` (
  `reservation_id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `parking_spot_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT 0,
  `date` date NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `half_day` tinyint(1) NOT NULL DEFAULT 0,
  `am` tinyint(1) DEFAULT NULL,
  `cancelled_at` datetime DEFAULT NULL,
  `cancelled_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `fk_tbl_reservation_tbl_user1_idx` (`user_id`),
  KEY `fk_tbl_reservation_tbl_vehicle1_idx` (`vehicle_id`),
  KEY `fk_tbl_reservation_tbl_parking-spot1_idx` (`parking_spot_id`),
  CONSTRAINT `fk_tbl_reservation_tbl_parking-spot1` FOREIGN KEY (`parking_spot_id`) REFERENCES `tbl_parking_spot` (`parking_spot_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_reservation_tbl_user1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tbl_reservation_tbl_vehicle1` FOREIGN KEY (`vehicle_id`) REFERENCES `tbl_vehicle` (`vehicle_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_reservation`
--

LOCK TABLES `tbl_reservation` WRITE;
/*!40000 ALTER TABLE `tbl_reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `password` varchar(60) NOT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT 0,
  `email` varchar(20) NOT NULL,
  `first_name` varchar(15) NOT NULL,
  `last_name` varchar(15) NOT NULL,
  `preferred_language` enum('de','en','fr') DEFAULT 'en',
  `role` enum('admin','user') DEFAULT 'user',
  `username` varchar(15) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user`
--

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES (1,'2023-05-03 12:20:04',1,NULL,NULL,'$2a$10$QCtsh6d7iwA1Ocsqyvod1u3UNXzEF6EtJP3ihpta1qMEVgG4aCHK2',0,'jjaggi@adobe.com','Julia','Jäggi','de','admin','jjaggi'),(2,'2023-05-03 12:20:29',1,NULL,NULL,'$2a$10$4VNsDnX6IeGw/J88PXkNWugyeixDkpqy5jGcM0xB4B14fv/SiEj/S',0,'lima@adobe.com','Raquel','Lima','en','user','lima'),(3,'2023-05-03 12:21:21',1,NULL,NULL,'$2a$10$lmVWsVLj7khIBv8HOwt8T.d5X08r9Jn7uYS6ENqUKFFMWs0vV5IrK',0,'djaeggi@adobe.com','Dominique','Jäggi','en','user','djaeggi'),(4,'2023-05-03 12:22:04',1,NULL,NULL,'$2a$10$S97XSwciCym85amhdO8yg.w.yRgJTOngyfOLFANqTF2fG84YO5agO',0,'lkrapf@adobe.com','Lars','Krapf','en','user','lkrapf'),(5,'2023-05-03 12:22:51',1,NULL,NULL,'$2a$10$Mp6D/2cNWrUQppS8Hldus.wEzfe36GAO.b1PvIYMQ1WJzKFpObIrW',0,'rofe@adobe.com','Raphael','Wegmüller','en','user','rofe');
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_vehicle`
--

DROP TABLE IF EXISTS `tbl_vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_vehicle` (
  `vehicle_id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `ev` tinyint(1) NOT NULL DEFAULT 0,
  `license_plate_number` varchar(10) NOT NULL,
  `make` varchar(20) NOT NULL,
  `model` varchar(25) NOT NULL,
  PRIMARY KEY (`vehicle_id`),
  KEY `fk_tbl_vehicle_tbl_user_idx` (`user_id`),
  CONSTRAINT `fk_tbl_vehicle_tbl_user` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_vehicle`
--

LOCK TABLES `tbl_vehicle` WRITE;
/*!40000 ALTER TABLE `tbl_vehicle` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_vehicle` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-05 16:59:40
