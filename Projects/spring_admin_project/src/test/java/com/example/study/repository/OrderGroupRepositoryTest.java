package com.example.study.repository;

import com.example.study.StudyApplicationTests;
import com.example.study.model.entity.OrderGroup;
import com.example.study.model.enumclass.OrderType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class OrderGroupRepositoryTest extends StudyApplicationTests {
	@Autowired
	OrderGroupRepository orderGroupRepository;
	@Test
	public void create(){
//		id bigint(20) AI PK
//		status varchar(50)
//		order_type varchar(50)
//		rev_address varchar(100)
//		rev_name varchar(50)
//		payment_type varchar(50)
//		total_price decimal(12,4)
//		total_quantity int(11)
//		order_at datetime
//		arrival_date datetime
//		created_at datetime
//		created_by varchar(20)
//		updated_at datetime
//		updated_by varchar(20)
//		user_id bigint(20)
		OrderGroup orderGroup = new OrderGroup();
		orderGroup.setStatus("REGISTERED");
		orderGroup.setOrderType(OrderType.ALL);
		orderGroup.setRevAddress("SEOUL");
		orderGroup.setRevName("MICLE");
		orderGroup.setPaymentType("CARD");
		orderGroup.setTotalPrice(BigDecimal.valueOf(1000000));
		orderGroup.setTotalQuantity(1000);
		orderGroup.setOrderAt(LocalDateTime.now().minusDays(2));
		orderGroup.setArrivalDate(LocalDateTime.now());
//		orderGroup.setUserId(1L);
		orderGroupRepository.save(orderGroup);
	}


}
