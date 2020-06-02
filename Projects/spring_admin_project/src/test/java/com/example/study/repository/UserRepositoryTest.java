package com.example.study.repository;


import com.example.study.StudyApplicationTests;
import com.example.study.model.entity.User;
import com.example.study.model.enumclass.UserStatus;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

public class UserRepositoryTest extends StudyApplicationTests {
	//Dependency Injection (DI)
	@Autowired
	private UserRepository userRepository;

	@Test
	public void create() {
		String account = "Test01";
		String password = "Test01";
		UserStatus status = UserStatus.REGISTERED;
		String email = "Test01@gmail.co.kr";
		LocalDateTime registeredAt = LocalDateTime.now();

		User user = User.builder().account(account).password(password).status(status).email(email).registeredAt(registeredAt).build();
		user.setAccount(account);
		user.setPassword(password);
		user.setPhoneNumber("01065562717");
		user.setStatus(status);
		user.setEmail(email);
		user.setRegisteredAt(registeredAt);
		User newUser = userRepository.save(user);
		System.out.println(newUser);

	}

	@Test
	@Transactional
	public void read() {

		Optional<User> user = userRepository.findFirstByPhoneNumberOrderByIdDesc("01065562717");
		user.ifPresent(selectedUser -> {
			System.out.println("주문상태 : "+selectedUser.getStatus());
			selectedUser.getOrderGroupList().stream().forEach(orderGroup -> {
				System.out.println("-----주문묶음----");
				System.out.println("수령인 : " + orderGroup.getRevName());
				System.out.println("총금액  : " + orderGroup.getTotalPrice());
				System.out.println("총수량 : " + orderGroup.getTotalQuantity());

				System.out.println("-----주문상세----");
				orderGroup.getOrderDetailList().stream().forEach(orderDetail -> {
					System.out.println("주문상품 : " + orderDetail.getItem().getName());
					System.out.println("도착일 : " + orderDetail.getArrivalDate());
					System.out.println("파트너 이름 : " + orderDetail.getItem().getPartner().getName());
					System.out.println("카테고리 이름 : " + orderDetail.getItem().getPartner().getCategory().getTitle());


					System.out.println("---파트너 상품 내역----");
					orderDetail.getItem().getPartner().getItemList().stream().forEach(item -> {
						System.out.println(item.getName());
					});
				});
			});
		});

	}


	@Test
	@Transactional
	public void update() {
		Optional<User> user = userRepository.findById(2L);

		user.ifPresent(selectUser -> {
			selectUser.setAccount("PPPPP");
			selectUser.setUpdatedAt(LocalDateTime.now());
//			selectUser.setUpdatedBy("admin");

			userRepository.save(selectUser);
		});

	}

	@Test
	@Transactional
	public void delete() {
		Optional<User> user = userRepository.findById(2L);

		user.ifPresent(selectUser -> {
			userRepository.delete(selectUser);
		});

		Optional<User> deleteUser = userRepository.findById(2L);
		if (deleteUser.isPresent()) {
			System.out.println(deleteUser.get());
		} else {
			System.out.println("No data");
		}
	}
}
