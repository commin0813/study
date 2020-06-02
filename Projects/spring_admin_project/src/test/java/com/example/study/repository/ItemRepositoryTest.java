package com.example.study.repository;

import com.example.study.StudyApplicationTests;
import com.example.study.model.entity.Item;
import com.example.study.model.enumclass.ItemStatus;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

public class ItemRepositoryTest extends StudyApplicationTests {
	@Autowired
	ItemRepository itemRepository;

	@Test
	public void create() {
		Item item = new Item();
		item.setName("NOTEBOOK");
		item.setStatus(ItemStatus.REGISTERED);
		item.setTitle("SAMSUNG");
		item.setPrice(BigDecimal.valueOf(100000));
		item.setContent("삼성 노트북");
		item.setBrandName("SAMSUNG");
		item.setRegisteredAt(LocalDateTime.now());

		Item newItem = itemRepository.save(item);
		System.out.println("newItem : " + newItem);
	}

	@Test
	@Transactional
	public void read() {
		Optional<Item> item = itemRepository.findById(3L);
		item.ifPresent(selectItem -> {
			System.out.println("selectItem : " + selectItem);
		});
	}
//
//	@Test
//	@Transactional
//	public void update() {
//		Optional<User> user = userRepository.findById(2L);
//
//		user.ifPresent(selectUser -> {
//			selectUser.setAccount("PPPPP");
//			selectUser.setUpdatedAt(LocalDateTime.now());
//			selectUser.setUpdatedBy("admin");
//
//			userRepository.save(selectUser);
//		});
//
//	}
//
//	@Test
//	@Transactional
//	public void delete() {
//		Optional<User> user = userRepository.findById(2L);
//
//		user.ifPresent(selectUser -> {
//			userRepository.delete(selectUser);
//		});
//
//		Optional<User> deleteUser = userRepository.findById(2L);
//		if (deleteUser.isPresent()) {
//			System.out.println(deleteUser.get());
//		} else {
//			System.out.println("No data");
//		}
//	}

}

