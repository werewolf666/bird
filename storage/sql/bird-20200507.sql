-- 创建bird数据库
-- ----------------------------
-- Table structure for bd_user_info
-- ----------------------------
DROP TABLE IF EXISTS `bd_user_info`;
CREATE TABLE `bd_user_info`  (
  `user_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户ID',
  `user_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '登录账号',
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `nick_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `sex` tinyint(4) NOT NULL DEFAULT 0 COMMENT '性别:0:男;1:女',
  `mobile` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号码',
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `address` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '通信地址',
  `create_time` timestamp(0) NOT NULL COMMENT '创建时间',
  `update_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '状态更新时间',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户信息表' ROW_FORMAT = Dynamic;

-- 插入初始信息
INSERT INTO `bd_user_info` (`user_id`, `user_name`, `password`, `nick_name`,`sex`,`mobile`, `email`, `address`) VALUES
('ccda00c958fc94d69ee15eb3a6d2f5bf', 'admin', '123456','管理员', 0, '10086', '10086@qq.com','贵州贵阳')

-- 报名信息表
DROP TABLE IF EXISTS `bd_enroll_info`;
CREATE TABLE `bd_enroll_info`  (
  `enroll_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '报名ID',
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '报名人姓名',
  `bird_no` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '鸽子脚环代码',
  `remark` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '备注',
  `status` tinyint(4) NULL DEFAULT 1 COMMENT '状态:0:完成;1:比赛中;',
  `start_time` timestamp(0) NOT NULL COMMENT '报名时间',
  `end_time` timestamp(0) NOT NULL COMMENT '结束时间',
  `update_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '状态更新时间',
  PRIMARY KEY (`enroll_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '报名信息表' ROW_FORMAT = Dynamic;


-- 历届成绩表
DROP TABLE IF EXISTS `bd_mark_info`;
CREATE TABLE `bd_mark_info`  (
  `mark_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '成绩ID',
  `enroll_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '报名ID',
  `game_no` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '比赛场次',
  `start_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '比赛开始时间',
  `end_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '比赛结束时间',
  `update_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '状态更新时间',
  PRIMARY KEY (`mark_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '成绩信息表' ROW_FORMAT = Dynamic;