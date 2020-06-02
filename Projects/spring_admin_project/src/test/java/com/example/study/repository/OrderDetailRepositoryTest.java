package com.example.study.repository;

import com.example.study.StudyApplicationTests;
import com.example.study.model.entity.OrderDetail;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class OrderDetailRepositoryTest extends StudyApplicationTests {
	@Autowired
	OrderDetailRepository orderDetailRepository;

	@Test
	public void create(){
//		id bigint(20) AI PK
//		status varchar(50)
//		arrival_date datetime
//		quantity int(11)
//		total_price decimal(12,4)
//		created_at datetime
//		created_by varchar(20)
//		updated_at datetime
//		updated_by varchar(20)
//		order_group_id bigint(20)
//		item_id bigint(20)
		OrderDetail detail = new OrderDetail();
		detail.setStatus("REGISTERED");
		detail.setArrivalDate(LocalDateTime.now().plusDays(2));
		detail.setQuantity(100);
		detail.setTotalPrice(new BigDecimal(10000000));
//		detail.setOrderGroupId(1L);
//		detail.setItemId(1L);

		orderDetailRepository.save(detail);
//		detail.setOrderGroupId();
//

	}
}
