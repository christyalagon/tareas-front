-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: localhost    Database: tareas
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alumno`
--
DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255),
  `perfil` char(1),
  `primer_apellido` varchar(255),
  `segundo_apellido` varchar(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



DROP TABLE IF EXISTS `alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `alumno` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `codigo_alumno` varchar(255),
  `dep_id` varchar(255),
  `nombre` varchar(255),
  `primer_apellido` varchar(255),
  `segundo_apellido` varchar(255),
  `tutor_id` bigint(20),
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_alumno_UNIQUE` (`codigo_alumno`),
  CONSTRAINT `alumno_ibfk_2` FOREIGN KEY (`tutor_id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ciclo`
--

DROP TABLE IF EXISTS `ciclo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ciclo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(255) DEFAULT NULL,
  `denominacion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `modulos`
--

DROP TABLE IF EXISTS `modulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `modulos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_mod` varchar(255),
  `curso` char(1),
  `denominacion_mod` varchar(255),
  `horas` int(11),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_Key` (`codigo_mod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Table structure for table `resultados_aprendizaje`
--

DROP TABLE IF EXISTS `resultados_aprendizaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `resultados_aprendizaje` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `codigo_mod` varchar(255),
  `codigo_RA` varchar(255),
  `descripcion_ra` varchar(255),
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_key` (`codigo_mod`, `codigo_RA`),
  UNIQUE KEY `UNIQUE_key2` (`codigo_RA`),
  CONSTRAINT `cod_mod_ibfk_1` FOREIGN KEY (`codigo_mod`) REFERENCES `modulos` (`codigo_mod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Table structure for table `criterios_evaluacion`
--

DROP TABLE IF EXISTS `criterios_evaluacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `criterios_evaluacion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `codigo_mod` varchar(255),
  `codigo_RA` varchar(255),
  `codigo_CE` varchar(255),
  `descripcion_CE` varchar(255),
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigos_UNIQUES` (`codigo_CE`,`codigo_mod`,`codigo_RA`),
  CONSTRAINT `cod_RA_ibfk_1` FOREIGN KEY (`codigo_RA`) REFERENCES `resultados_aprendizaje` (`codigo_RA`),
  CONSTRAINT `cod_mod_ibfk_2` FOREIGN KEY (`codigo_mod`) REFERENCES `modulos` (`codigo_mod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ensena`
--

DROP TABLE IF EXISTS `ensena`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ensena` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `codigo_alumno` varchar(255) DEFAULT NULL,
  `profesor_id` bigint(20),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_Key` (`codigo_alumno`, `profesor_id`),
  CONSTRAINT `alumno_ibfk_1` FOREIGN KEY (`profesor_id`) REFERENCES `profesor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `esta_compuesto`
--

DROP TABLE IF EXISTS `esta_compuesto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `esta_compuesto` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(255),
  `codigo_mod` varchar(255),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueKey` (`codigo`, `codigo_mod`),
  CONSTRAINT `ciclo_ibfk_1` FOREIGN KEY (`codigo`) REFERENCES `ciclo` (`codigo`),
  CONSTRAINT `modulo_ibfk_1` FOREIGN KEY (`codigo_mod`) REFERENCES `modulos` (`codigo_mod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `participa`
--

DROP TABLE IF EXISTS `participa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `participa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_alumno` varchar(255),
  `codigo` varchar(255),
  `curso_academico` varchar(255),
  `nivel` varchar(1),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueKey` (`codigo_alumno`, `codigo`, `curso_academico`),
  CONSTRAINT `cod_alum_ibfk_1` FOREIGN KEY (`codigo_alumno`) REFERENCES `alumno` (`codigo_alumno`),
  CONSTRAINT `ciclo_ibfk_2` FOREIGN KEY (`codigo`) REFERENCES `ciclo` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `profesor`
--
-- TTODO seguir por aquí
DROP TABLE IF EXISTS `profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `profesor` (
  `id` bigint(20) NOT NULL,
  `centro_educativo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `profesor_ibfk_1` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `proyecto`
--

DROP TABLE IF EXISTS `proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `proyecto` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255),
  `descripcion` varchar(255),
  `tutor_id` bigint(20),
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`),
  CONSTRAINT `proyecto_ibfk_1` FOREIGN KEY (`tutor_id`) REFERENCES `tutor_empresa` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `puntua`
--

DROP TABLE IF EXISTS `puntua`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `puntua` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo_mod` varchar(4),
  `codigo_RA` varchar(1),
  `codigo_CE` varchar(2),
  `codigo_tarea` varchar(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigos_UNIQUE` (`codigo_CE`, `codigo_mod`, `codigo_RA`, `codigo_tarea`),
  CONSTRAINT `cod_tar_ibfk_1` FOREIGN KEY (`codigo_tarea`) REFERENCES `tareas` (`codigo_tarea`),
  CONSTRAINT `cod_modulo_ibfk_1` FOREIGN KEY (`codigo_mod`) REFERENCES `modulos` (`codigo_mod`),
  CONSTRAINT `cod_ra_ibfk_2` FOREIGN KEY (`codigo_RA`) REFERENCES `resultados_aprendizaje` (`codigo_RA`),
  CONSTRAINT `cod_ce_ibfk_1` FOREIGN KEY (`codigo_CE`) REFERENCES `criterio_evaluacion` (`codigo_CE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `tareas`
--

DROP TABLE IF EXISTS `tareas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tareas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `codigo_tarea` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_key` (`codigo_tarea`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Table structure for table `realiza`
--
-- TODO REALIZA
DROP TABLE IF EXISTS `realiza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `realiza` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `codigo_alumno` varchar(255),
  `codigo_tarea` varchar(255),
  `fecha` datetime,
  `nota` bigint(20),
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_key` (`codigo_alumno`, `codigo_tarea`, `fecha`),
  CONSTRAINT `cod_tarea_ibfk_1` FOREIGN KEY (`codigo_tarea`) REFERENCES `tareas` (`codigo_tarea`),
  CONSTRAINT `cod_alum_ibfk_2` FOREIGN KEY (`codigo_alumno`) REFERENCES `alumno` (`codigo_alumno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Table structure for table `tiene`
--

DROP TABLE IF EXISTS `tiene`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tiene` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `codigo_tarea` varchar(255),
  `nombre` varchar(255),
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE_key` (`codigo_tarea`,`nombre` ),
  CONSTRAINT `cod_tarea_ibfk_2` FOREIGN KEY (`codigo_tarea`) REFERENCES `tareas` (`codigo_tarea`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tutor_empresa`
--

DROP TABLE IF EXISTS `tutor_empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tutor_empresa` (
  `id` bigint(20) NOT NULL,
  `empresa` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `tutor_id_ibfk_1` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuario`
--


/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-17 11:20:29
