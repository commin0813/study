package com.example.study.model.entity;

import com.example.study.model.enumclass.UserStatus;
import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
//@Table(name = "User") // 실제 DB의 테이블 이름과 클래스이름이 동일하다면 선언안해도됨.
@ToString(exclude = {"orderGroup"})
@EntityListeners(AuditingEntityListener.class)
@Builder
@Accessors(chain = true)
public class User {
//	id int(11) AI PK
//	account varchar(45)
//	email varchar(45)
//	phone_number varchar(45)
//	created_at datetime
//	created_by varchar(45)
//	updated_at datetime
//	updated_by varchar(45)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String account;

	private String password;


	@Enumerated(EnumType.STRING)
	private UserStatus status; // REGISTERED / UNREGISTERED

	private String email;

	private String phoneNumber;

	private LocalDateTime registeredAt;

	private LocalDateTime unregisteredAt;

	@CreatedDate
	private LocalDateTime createdAt;

	@CreatedBy
	private String createdBy;

	@LastModifiedDate
	private LocalDateTime updatedAt;

	@LastModifiedBy
	private String updatedBy;



	//User 1 : N OrderGroup
	@OneToMany(fetch = FetchType.LAZY,mappedBy = "user")
	private List<OrderGroup> orderGroupList;




}
