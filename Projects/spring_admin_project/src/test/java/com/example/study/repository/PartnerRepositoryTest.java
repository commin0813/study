package com.example.study.repository;

import com.example.study.StudyApplicationTests;
import com.example.study.model.entity.Partner;
import com.example.study.model.enumclass.PartnerStatus;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

public class PartnerRepositoryTest extends StudyApplicationTests {

	@Autowired
	PartnerRepository partnerRepository ;

	@Test
	public void create(){
//		id bigint(20) AI PK
//		name varchar(100)
//		status varchar(45)
//		address varchar(100)
//		call_center varchar(13)
//		partner_number varchar(13)
//		business_number varchar(16)
//		ceo_name varchar(20)
//		registered_at datetime
//		unregistered_at datetime
//		created_at datetime
//		created_by varchar(20)
//		updated_at datetime
//		updated_by varchar(20)
//		category_id bigint(20)

		String name = "Jhone";
		PartnerStatus status= PartnerStatus.REGISTERED;
		String address= "SEOUL";
		String callCenter= "010-2333-4444";

		LocalDateTime registeredAt = LocalDateTime.now();
		LocalDateTime createdAt = LocalDateTime.now();
		String createdBy = "admin";



		Partner partner = new Partner();
		partner.setName(name);
		partner.setStatus(status);
		partner.setAddress(address);
		partner.setCallCenter(callCenter);
		partner.setRegisteredAt(registeredAt);
		partner.setCeoName("Macle");
//		partner.setCategoryId(1L);

		partnerRepository.save(partner);

	}

}
