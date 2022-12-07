CREATE DATABASE  IF NOT EXISTS `db_senailicious` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_senailicious`;
-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: localhost    Database: db_senailicious
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('a3e39963-7aa7-4387-9296-69bdd8bf0fc0','d49b43e69c94f479ad1a1b2c654ec9095df3ca6668c4c508b852a2876f75aa09','2022-12-05 12:36:23.440','20221130133434_conectando_o_banco',NULL,NULL,'2022-12-05 12:36:23.433',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_administrador`
--

DROP TABLE IF EXISTS `tbl_administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_administrador` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(256) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_administrador`
--

LOCK TABLES `tbl_administrador` WRITE;
/*!40000 ALTER TABLE `tbl_administrador` DISABLE KEYS */;
INSERT INTO `tbl_administrador` VALUES (1,'root.senailicious@gmail.com','12202345','root');
/*!40000 ALTER TABLE `tbl_administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_bebida`
--

DROP TABLE IF EXISTS `tbl_bebida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_bebida` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_produto` int NOT NULL,
  `id_tipo_bebida` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_produto_bebida` (`id_produto`),
  KEY `FK_tipo_bebida_bebida` (`id_tipo_bebida`),
  CONSTRAINT `FK_produto_bebida` FOREIGN KEY (`id_produto`) REFERENCES `tbl_produto` (`id`),
  CONSTRAINT `FK_tipo_bebida_bebida` FOREIGN KEY (`id_tipo_bebida`) REFERENCES `tbl_tipo_bebida` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_bebida`
--

LOCK TABLES `tbl_bebida` WRITE;
/*!40000 ALTER TABLE `tbl_bebida` DISABLE KEYS */;
INSERT INTO `tbl_bebida` VALUES (1,2,2);
/*!40000 ALTER TABLE `tbl_bebida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_ingrediente`
--

DROP TABLE IF EXISTS `tbl_ingrediente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_ingrediente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_ingrediente`
--

LOCK TABLES `tbl_ingrediente` WRITE;
/*!40000 ALTER TABLE `tbl_ingrediente` DISABLE KEYS */;
INSERT INTO `tbl_ingrediente` VALUES (1,'Calabresa'),(2,'Cebola'),(3,'Azeitona'),(4,'Água'),(5,'Laranja'),(6,'Açucar');
/*!40000 ALTER TABLE `tbl_ingrediente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_mensagem`
--

DROP TABLE IF EXISTS `tbl_mensagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_mensagem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) NOT NULL,
  `email` varchar(256) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `celular` varchar(20) NOT NULL,
  `mensagem` text NOT NULL,
  `id_tipo_mensagem` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_tipo_mensagem_mensagem` (`id_tipo_mensagem`),
  CONSTRAINT `FK_tipo_mensagem_mensagem` FOREIGN KEY (`id_tipo_mensagem`) REFERENCES `tbl_tipo_mensagem` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_mensagem`
--

LOCK TABLES `tbl_mensagem` WRITE;
/*!40000 ALTER TABLE `tbl_mensagem` DISABLE KEYS */;
INSERT INTO `tbl_mensagem` VALUES (1,'Larissa','larissanunes@senai.com','35993326','11 986271996','Sugiro que coloquem mais calabresa na pizza de calabresa.',1);
/*!40000 ALTER TABLE `tbl_mensagem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_pizza`
--

DROP TABLE IF EXISTS `tbl_pizza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_pizza` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantidade_vezes_favorito` int NOT NULL,
  `id_produto` int NOT NULL,
  `id_tipo_pizza` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_produto_pizza` (`id_produto`),
  KEY `FK_tipo_pizza_pizza` (`id_tipo_pizza`),
  CONSTRAINT `FK_produto_pizza` FOREIGN KEY (`id_produto`) REFERENCES `tbl_produto` (`id`),
  CONSTRAINT `FK_tipo_pizza_pizza` FOREIGN KEY (`id_tipo_pizza`) REFERENCES `tbl_tipo_pizza` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_pizza`
--

LOCK TABLES `tbl_pizza` WRITE;
/*!40000 ALTER TABLE `tbl_pizza` DISABLE KEYS */;
INSERT INTO `tbl_pizza` VALUES (1,0,1,1);
/*!40000 ALTER TABLE `tbl_pizza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_produto`
--

DROP TABLE IF EXISTS `tbl_produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_produto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `imagem` varchar(200) DEFAULT NULL,
  `tamanho` varchar(45) DEFAULT NULL,
  `preco` decimal(4,2) DEFAULT NULL,
  `desconto` int DEFAULT NULL,
  `id_tipo_produto` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_tipo_produto_produto` (`id_tipo_produto`),
  CONSTRAINT `FK_tipo_produto_produto` FOREIGN KEY (`id_tipo_produto`) REFERENCES `tbl_tipo_produto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_produto`
--

LOCK TABLES `tbl_produto` WRITE;
/*!40000 ALTER TABLE `tbl_produto` DISABLE KEYS */;
INSERT INTO `tbl_produto` VALUES (1,'Calabresa','https://img.freepik.com/fotos-premium/pizza-a-brasileira-com-queijo-mussarela-linguica-calabresa-e-cebola-vista-do-topo_261158-2018.jpg?w=2000','Grande',39.90,NULL,1),(2,'Suco de laranja','https://riomarfortalezaonline.com.br/fortalezashopping/2020/05/Suco_de_laranja_cheppitos.jpg','400 ml',6.00,NULL,2);
/*!40000 ALTER TABLE `tbl_produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_produto_ingrediente`
--

DROP TABLE IF EXISTS `tbl_produto_ingrediente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_produto_ingrediente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_tipo_produto` int NOT NULL,
  `id_ingrediente` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_tipo_produto_produto_ingrediente` (`id_tipo_produto`),
  KEY `FK_ingrediente_produto_ingrediente` (`id_ingrediente`),
  CONSTRAINT `FK_ingrediente_produto_ingrediente` FOREIGN KEY (`id_ingrediente`) REFERENCES `tbl_ingrediente` (`id`),
  CONSTRAINT `FK_tipo_produto_produto_ingrediente` FOREIGN KEY (`id_tipo_produto`) REFERENCES `tbl_tipo_produto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_produto_ingrediente`
--

LOCK TABLES `tbl_produto_ingrediente` WRITE;
/*!40000 ALTER TABLE `tbl_produto_ingrediente` DISABLE KEYS */;
INSERT INTO `tbl_produto_ingrediente` VALUES (1,1,1),(2,1,2),(3,1,3),(4,2,4),(5,2,5),(6,2,6);
/*!40000 ALTER TABLE `tbl_produto_ingrediente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tipo_bebida`
--

DROP TABLE IF EXISTS `tbl_tipo_bebida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tipo_bebida` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tipo_bebida`
--

LOCK TABLES `tbl_tipo_bebida` WRITE;
/*!40000 ALTER TABLE `tbl_tipo_bebida` DISABLE KEYS */;
INSERT INTO `tbl_tipo_bebida` VALUES (1,'Alcoólica'),(2,'Suco'),(3,'Refrigerante');
/*!40000 ALTER TABLE `tbl_tipo_bebida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tipo_mensagem`
--

DROP TABLE IF EXISTS `tbl_tipo_mensagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tipo_mensagem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tipo_mensagem`
--

LOCK TABLES `tbl_tipo_mensagem` WRITE;
/*!40000 ALTER TABLE `tbl_tipo_mensagem` DISABLE KEYS */;
INSERT INTO `tbl_tipo_mensagem` VALUES (1,'Sugestão'),(2,'Crítica');
/*!40000 ALTER TABLE `tbl_tipo_mensagem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tipo_pizza`
--

DROP TABLE IF EXISTS `tbl_tipo_pizza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tipo_pizza` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tipo_pizza`
--

LOCK TABLES `tbl_tipo_pizza` WRITE;
/*!40000 ALTER TABLE `tbl_tipo_pizza` DISABLE KEYS */;
INSERT INTO `tbl_tipo_pizza` VALUES (1,'Salgada'),(2,'Doce');
/*!40000 ALTER TABLE `tbl_tipo_pizza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tipo_produto`
--

DROP TABLE IF EXISTS `tbl_tipo_produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tipo_produto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tipo_produto`
--

LOCK TABLES `tbl_tipo_produto` WRITE;
/*!40000 ALTER TABLE `tbl_tipo_produto` DISABLE KEYS */;
INSERT INTO `tbl_tipo_produto` VALUES (1,'Pizza'),(2,'Bebida');
/*!40000 ALTER TABLE `tbl_tipo_produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teste`
--

DROP TABLE IF EXISTS `teste`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teste` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `teste_id_key` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teste`
--

LOCK TABLES `teste` WRITE;
/*!40000 ALTER TABLE `teste` DISABLE KEYS */;
/*!40000 ALTER TABLE `teste` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-05 10:28:13
