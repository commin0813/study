package com.example.study.repository;

import com.example.study.StudyApplicationTests;
import com.example.study.model.entity.AdminUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

public class AdminUserRepositoryTest extends StudyApplicationTests {
	@Autowired
	AdminUserRepository adminUserRepository;
	@Test
	public void create(){
//		id bigint(20) AI PK
//		account varchar(12)
//		password varchar(50)
//		status varchar(50)
//		role varchar(50)
//		last_login_at datetime
//		login_fail_count int(11)
//		password_updated_at datetime
//		registered_at datetime
//		unregistered_at datetime
//		created_at datetime
//		created_by varchar(20)
//		updated_at datetime
//		updated_by varchar(20)
		AdminUser adminUser = new AdminUser();
		adminUser.setAccount("admin");
		adminUser.setPassword("1234");
		adminUser.setStatus("REGISTERED");
		adminUser.setRole("MASTER");
		adminUser.setLastLoginAt(LocalDateTime.now());
		adminUser.setLoginFailCount(0);
		//adminUser.setPasswordUpdatedAt(LocalDateTime.now());
		adminUser.setRegisteredAt(LocalDateTime.now());
		AdminUser newAdminUser = 	adminUserRepository.save(adminUser);
		newAdminUser.setAccount("CHANGE");
		adminUserRepository.save(newAdminUser);

	}
}
