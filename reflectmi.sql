/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 80022
Source Host           : localhost:3306
Source Database       : reflectmi

Target Server Type    : MYSQL
Target Server Version : 80022
File Encoding         : 65001

Date: 2021-05-30 22:36:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `calendar`
-- ----------------------------
DROP TABLE IF EXISTS `calendar`;
CREATE TABLE `calendar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateTime` datetime NOT NULL,
  `EventType` int NOT NULL,
  `eventName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Note` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `EventType` (`EventType`),
  CONSTRAINT `calendar_ibfk_1` FOREIGN KEY (`EventType`) REFERENCES `eventtype` (`EventTypeId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of calendar
-- ----------------------------
INSERT INTO `calendar` VALUES ('1', '2021-04-27 18:08:37', '1', 'Governor\'s Birthday', 'Blah Blah');
INSERT INTO `calendar` VALUES ('2', '2021-05-07 16:09:50', '3', 'Projectus Meeting', 'Blah Blah');
INSERT INTO `calendar` VALUES ('3', '2021-07-01 18:24:19', '4', 'Abacus Project', '');
INSERT INTO `calendar` VALUES ('4', '2021-04-26 22:49:46', '4', 'reflectMi Project Document', null);
INSERT INTO `calendar` VALUES ('5', '2021-05-03 22:56:34', '1', 'Itso\'s Birthday', null);
INSERT INTO `calendar` VALUES ('6', '2021-05-03 23:23:08', '2', 'Unkown Holiday', null);
INSERT INTO `calendar` VALUES ('7', '2021-06-09 23:16:26', '1', 'My Birthday', null);
INSERT INTO `calendar` VALUES ('8', '2021-04-26 00:10:06', '4', 'CreativeLabs Media', null);
INSERT INTO `calendar` VALUES ('9', '2021-05-01 12:58:43', '2', 'Workers Day', null);
INSERT INTO `calendar` VALUES ('10', '2021-05-08 12:45:55', '5', 'Bruce Reminder', null);
INSERT INTO `calendar` VALUES ('11', '2021-04-27 13:00:14', '5', 'Persuade Reminder', null);
INSERT INTO `calendar` VALUES ('12', '2021-05-19 21:26:24', '3', 'hhh', null);

-- ----------------------------
-- Table structure for `eventtype`
-- ----------------------------
DROP TABLE IF EXISTS `eventtype`;
CREATE TABLE `eventtype` (
  `EventTypeId` int NOT NULL AUTO_INCREMENT,
  `EventTypeName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`EventTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of eventtype
-- ----------------------------
INSERT INTO `eventtype` VALUES ('1', 'Birthday');
INSERT INTO `eventtype` VALUES ('2', 'Public Holiday');
INSERT INTO `eventtype` VALUES ('3', 'Meeting');
INSERT INTO `eventtype` VALUES ('4', 'Project');
INSERT INTO `eventtype` VALUES ('5', 'Reminder');
