-- =============================================
-- Modelo do Banco de Dados - IMOBITEC
-- Estrutura completa (apenas DDL - sem dados)
-- Data: Abril/2026
-- =============================================

CREATE DATABASE IF NOT EXISTS `imobitec`
    DEFAULT CHARACTER SET utf8mb4 
    COLLATE utf8mb4_0900_ai_ci;

USE `imobitec`;

-- =============================================
-- Tabela: descricao_imoveis
-- =============================================
CREATE TABLE `descricao_imoveis` (
  `TP_IMOVEL` int NOT NULL,
  `TIPO_IMOVEL` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`TP_IMOVEL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- =============================================
-- Tabela: descricao_venda
-- =============================================
CREATE TABLE `descricao_venda` (
  `CD_VENDA` int NOT NULL,
  `DS_CONDICAO_VENDA` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`CD_VENDA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- =============================================
-- Tabela: imobiliarias
-- =============================================
CREATE TABLE `imobiliarias` (
  `ID_IMOBILIARIA` int NOT NULL AUTO_INCREMENT,
  `NM_IMOBILIARIA` varchar(100) DEFAULT NULL,
  `RZ_SOCIAL` varchar(150) DEFAULT NULL,
  `DS_CNPJ` varchar(20) DEFAULT NULL,
  `NM_TELEFONE` varchar(20) NOT NULL,
  `DS_CEP` varchar(10) DEFAULT NULL,
  `DS_EMAIL` varchar(100) NOT NULL,
  `DS_RUA` varchar(150) DEFAULT NULL,
  `NR_CASA` varchar(10) DEFAULT NULL,
  `NM_BAIRRO` varchar(100) DEFAULT NULL,
  `NM_CIDADE` varchar(100) DEFAULT NULL,
  `NM_ESTADO` varchar(50) DEFAULT NULL,
  `DT_CRIACAO` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `DT_ATUALIZACAO` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_IMOBILIARIA`),
  UNIQUE KEY `DS_EMAIL` (`DS_EMAIL`),
  UNIQUE KEY `DS_CNPJ` (`DS_CNPJ`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- =============================================
-- Tabela: permissoes
-- =============================================
CREATE TABLE `permissoes` (
  `ID_PERMISSAO` int NOT NULL AUTO_INCREMENT,
  `NM_PERMISSAO` varchar(50) NOT NULL,
  `DS_PERMISSAO` varchar(100) DEFAULT NULL,
  `DT_CRIACAO` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_PERMISSAO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- =============================================
-- Tabela: status_imoveis
-- =============================================
CREATE TABLE `status_imoveis` (
  `STATUS_IMOVEL` varchar(10) NOT NULL,
  `ID_STATUS` int NOT NULL,
  PRIMARY KEY (`ID_STATUS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- =============================================
-- Tabela: imoveis
-- =============================================
CREATE TABLE `imoveis` (
  `ID_IMOVEL` int NOT NULL AUTO_INCREMENT,
  `ID_IMOBILIARIA` int NOT NULL,
  `VR_IMOVEL` decimal(12,2) NOT NULL,
  `DS_TEXTO` text,
  `DS_CEP_IMOVEL` varchar(10) DEFAULT NULL,
  `NM_IMOVEL` varchar(20) DEFAULT NULL,
  `DS_BAIRRO_IMOVEL` varchar(100) DEFAULT NULL,
  `DS_CIDADE_IMOVEL` varchar(100) DEFAULT NULL,
  `DS_ESTADO_IMOVEL` varchar(50) DEFAULT NULL,
  `DT_CRIACAO` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `TP_IMOVEL` int NOT NULL,
  `ID_STATUS` int NOT NULL,
  PRIMARY KEY (`ID_IMOVEL`),
  KEY `ID_IMOBILIARIA` (`ID_IMOBILIARIA`),
  KEY `descricao_imoveis` (`TP_IMOVEL`),
  KEY `status_imoveis` (`ID_STATUS`),
  CONSTRAINT `descricao_imoveis` FOREIGN KEY (`TP_IMOVEL`) REFERENCES `descricao_imoveis` (`TP_IMOVEL`),
  CONSTRAINT `imoveis_ibfk_1` FOREIGN KEY (`ID_IMOBILIARIA`) REFERENCES `imobiliarias` (`ID_IMOBILIARIA`),
  CONSTRAINT `status_imoveis` FOREIGN KEY (`ID_STATUS`) REFERENCES `status_imoveis` (`ID_STATUS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- =============================================
-- Tabela: usuarios
-- =============================================
CREATE TABLE `usuarios` (
  `ID_USUARIO` int NOT NULL AUTO_INCREMENT,
  `NM_USUARIO` varchar(100) DEFAULT NULL,
  `DT_NASCIMENTO` date DEFAULT NULL,
  `DS_USUARIO` varchar(30) NOT NULL,
  `DS_EMAIL` varchar(100) NOT NULL,
  `DS_GENERO` varchar(20) NOT NULL,
  `ID_PERMISSAO` int DEFAULT NULL,
  PRIMARY KEY (`ID_USUARIO`),
  UNIQUE KEY `DS_EMAIL` (`DS_EMAIL`),
  KEY `permissoes` (`ID_PERMISSAO`),
  CONSTRAINT `permissoes` FOREIGN KEY (`ID_PERMISSAO`) REFERENCES `permissoes` (`ID_PERMISSAO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- =============================================
-- Tabela: vendas
-- =============================================
CREATE TABLE `vendas` (
  `ID_VENDA` int NOT NULL AUTO_INCREMENT,
  `ID_USUARIO` int NOT NULL,
  `ID_IMOVEL` int NOT NULL,
  `VR_IMOVEL` decimal(12,2) NOT NULL,
  `VR_COMISSAO` decimal(10,2) DEFAULT NULL,
  `DT_VENDA` date NOT NULL,
  `CD_VENDA` int DEFAULT NULL,
  PRIMARY KEY (`ID_VENDA`),
  KEY `ID_USUARIO` (`ID_USUARIO`),
  KEY `ID_IMOVEL` (`ID_IMOVEL`),
  KEY `descricao_venda` (`CD_VENDA`),
  CONSTRAINT `descricao_venda` FOREIGN KEY (`CD_VENDA`) REFERENCES `descricao_venda` (`CD_VENDA`),
  CONSTRAINT `vendas_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuarios` (`ID_USUARIO`),
  CONSTRAINT `vendas_ibfk_2` FOREIGN KEY (`ID_IMOVEL`) REFERENCES `imoveis` (`ID_IMOVEL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;