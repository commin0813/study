package com.example.study.model.network.request;

import com.example.study.model.enumclass.OrderType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderGroupApiRequest {
//	id bigint(20) AI PK
//	status varchar(50)
//	order_type varchar(50)
//	rev_address varchar(100)
//	rev_name varchar(50)
//	payment_type varchar(50)
//	total_price decimal(12,4)
//	total_quantity int(11)
//	order_at datetime
//	arrival_date datetime
//	created_at datetime
//	created_by varchar(20)
//	updated_at datetime
//	updated_by varchar(20)
//	user_id bigint(20)

	private Long id;
	private String status;
//	arrival_date
	private OrderType orderType;
	private String revAddress;
	private String revName;
	private String paymentType;
	private Integer totalQuantity;
	private BigDecimal totalPrice;
	private LocalDateTime oderAt;
	private LocalDateTime arrivalDate;

	private LocalDateTime registeredAt;
	private LocalDateTime unRegisteredAt;
	private Long userId;
}
