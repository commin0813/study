package com.example.study.model.network.request;

import com.example.study.model.enumclass.PartnerStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class PartnerApiRequest {
//	Table: partner
//	Columns:
//	id bigint(20) AI PK
//	name varchar(100)
//	status varchar(45)
//	address varchar(100)
//	call_center varchar(13)
//	partner_number varchar(13)
//	business_number varchar(16)
//	ceo_name varchar(20)
//	registered_at datetime
//	unregistered_at datetime
//	created_at datetime
//	created_by varchar(20)
//	updated_at datetime
//	updated_by varchar(20)
//	category_id bigint(20)
	private Long id;
	@Enumerated(EnumType.STRING)
	private PartnerStatus status;
	private String name;
	private String address;
	private String callCenter;
	private String partnerNumber;
	private String businessNumber;
	private String ceoName;
	private LocalDateTime registeredAt;
	private LocalDateTime unRegisteredAt;
	private Long categoryId;



}
