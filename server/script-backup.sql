-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: cinemadb
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `CinemaChains`
--

DROP TABLE IF EXISTS `CinemaChains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CinemaChains` (
  `chain_id` varchar(255) NOT NULL,
  `chain_name` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`chain_id`),
  UNIQUE KEY `chain_name` (`chain_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CinemaChains`
--

LOCK TABLES `CinemaChains` WRITE;
/*!40000 ALTER TABLE `CinemaChains` DISABLE KEYS */;
/*!40000 ALTER TABLE `CinemaChains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CinemaClusters`
--

DROP TABLE IF EXISTS `CinemaClusters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CinemaClusters` (
  `cluster_id` varchar(255) NOT NULL,
  `cluster_name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `chain_id` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`cluster_id`),
  KEY `chain_id` (`chain_id`),
  CONSTRAINT `CinemaClusters_ibfk_1` FOREIGN KEY (`chain_id`) REFERENCES `CinemaChains` (`chain_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CinemaClusters`
--

LOCK TABLES `CinemaClusters` WRITE;
/*!40000 ALTER TABLE `CinemaClusters` DISABLE KEYS */;
/*!40000 ALTER TABLE `CinemaClusters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cinemas`
--

DROP TABLE IF EXISTS `Cinemas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cinemas` (
  `cinema_id` varchar(255) NOT NULL,
  `cinema_name` varchar(255) NOT NULL,
  `cluster_id` varchar(255) NOT NULL,
  `rowCount` int NOT NULL,
  `columnCount` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`cinema_id`),
  KEY `cluster_id` (`cluster_id`),
  CONSTRAINT `Cinemas_ibfk_1` FOREIGN KEY (`cluster_id`) REFERENCES `CinemaClusters` (`cluster_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cinemas`
--

LOCK TABLES `Cinemas` WRITE;
/*!40000 ALTER TABLE `Cinemas` DISABLE KEYS */;
/*!40000 ALTER TABLE `Cinemas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Movies`
--

DROP TABLE IF EXISTS `Movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Movies` (
  `movie_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `country` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `duration` int NOT NULL,
  `release_date` datetime DEFAULT NULL,
  `age_limit` varchar(255) DEFAULT NULL,
  `director` varchar(255) DEFAULT NULL,
  `cast` text,
  `description` longtext,
  `linkTrailer` varchar(255) DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL,
  `status` enum('Coming Soon','Now Showing') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Movies`
--

LOCK TABLES `Movies` WRITE;
/*!40000 ALTER TABLE `Movies` DISABLE KEYS */;
/*!40000 ALTER TABLE `Movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderTables`
--

DROP TABLE IF EXISTS `OrderTables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderTables` (
  `order_id` varchar(255) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `order_date` datetime NOT NULL,
  `total_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `payment_status` enum('Pending','Completed','Canceled') NOT NULL DEFAULT 'Completed',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `OrderTables_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderTables`
--

LOCK TABLES `OrderTables` WRITE;
/*!40000 ALTER TABLE `OrderTables` DISABLE KEYS */;
/*!40000 ALTER TABLE `OrderTables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Seats`
--

DROP TABLE IF EXISTS `Seats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Seats` (
  `seat_id` varchar(255) NOT NULL,
  `cinema_id` varchar(255) NOT NULL,
  `row` int NOT NULL,
  `column` int NOT NULL,
  `type` enum('VIP','Normal') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`seat_id`),
  UNIQUE KEY `unique_seat` (`cinema_id`,`row`,`column`),
  CONSTRAINT `Seats_ibfk_1` FOREIGN KEY (`cinema_id`) REFERENCES `Cinemas` (`cinema_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Seats`
--

LOCK TABLES `Seats` WRITE;
/*!40000 ALTER TABLE `Seats` DISABLE KEYS */;
/*!40000 ALTER TABLE `Seats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('001-create-cinemaChain.cjs'),('002-create-cinemaCluster.cjs'),('003-create-cinema.cjs'),('004-create-movie.cjs'),('005-create-seat.cjs'),('006-create-showtime.cjs'),('007-create-user.cjs'),('008-create-orderTable.cjs'),('009-create-ticket.cjs');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Showtimes`
--

DROP TABLE IF EXISTS `Showtimes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Showtimes` (
  `showtime_id` varchar(255) NOT NULL,
  `showtime_date` date NOT NULL,
  `showtime_starttime` time NOT NULL,
  `showtime_endtime` time NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `movie_id` varchar(255) NOT NULL,
  `cinema_id` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`showtime_id`),
  KEY `movie_id` (`movie_id`),
  KEY `cinema_id` (`cinema_id`),
  CONSTRAINT `Showtimes_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `Movies` (`movie_id`) ON DELETE CASCADE,
  CONSTRAINT `Showtimes_ibfk_2` FOREIGN KEY (`cinema_id`) REFERENCES `Cinemas` (`cinema_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Showtimes`
--

LOCK TABLES `Showtimes` WRITE;
/*!40000 ALTER TABLE `Showtimes` DISABLE KEYS */;
/*!40000 ALTER TABLE `Showtimes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tickets`
--

DROP TABLE IF EXISTS `Tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tickets` (
  `ticket_id` varchar(255) NOT NULL,
  `showtime_id` varchar(255) DEFAULT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  `seat_id` varchar(255) DEFAULT NULL,
  `ticket_status` enum('Booked','Used','Canceled') NOT NULL DEFAULT 'Booked',
  `movie_id_snapshot` varchar(255) DEFAULT NULL,
  `movie_title_snapshot` varchar(255) DEFAULT NULL,
  `chain_id_snapshot` varchar(255) DEFAULT NULL,
  `chain_name_snapshot` varchar(255) DEFAULT NULL,
  `cluster_id_snapshot` varchar(255) DEFAULT NULL,
  `cluster_name_snapshot` varchar(255) DEFAULT NULL,
  `address_snapshot` varchar(255) DEFAULT NULL,
  `cinema_name_snapshot` varchar(255) DEFAULT NULL,
  `row_snapshot` int DEFAULT NULL,
  `column_snapshot` int DEFAULT NULL,
  `showtime_date_snapshot` date DEFAULT NULL,
  `showtime_starttime_snapshot` time DEFAULT NULL,
  `showtime_endtime_snapshot` time DEFAULT NULL,
  `price_snapshot` decimal(10,2) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`ticket_id`),
  UNIQUE KEY `unique_ticket` (`showtime_id`,`seat_id`),
  KEY `order_id` (`order_id`),
  KEY `seat_id` (`seat_id`),
  CONSTRAINT `Tickets_ibfk_1` FOREIGN KEY (`showtime_id`) REFERENCES `Showtimes` (`showtime_id`) ON DELETE SET NULL,
  CONSTRAINT `Tickets_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `OrderTables` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `Tickets_ibfk_3` FOREIGN KEY (`seat_id`) REFERENCES `Seats` (`seat_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tickets`
--

LOCK TABLES `Tickets` WRITE;
/*!40000 ALTER TABLE `Tickets` DISABLE KEYS */;
/*!40000 ALTER TABLE `Tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `user_id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `user_role` enum('admin','user') NOT NULL DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES ('797a1329-5735-4c49-b30f-63c496e52687','admin','$2b$12$dfnX.xeeW8kKkBVhI6FCWuU0qS/mdDYGxNBHmTIsnIebcH4lYOKMS','admin@gmail.com','038038038','admin','2025-07-12 13:57:20','2025-07-12 13:57:20');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-12 14:02:55 