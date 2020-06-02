package com.example.study.repository;

import com.example.study.StudyApplicationTests;
import com.example.study.model.entity.Category;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.Optional;

public class CategoryRepositoryTest extends StudyApplicationTests {
	@Autowired
	private CategoryRepository categoryRepository;

	@Test
	public void create(){
		String type = "COMPUTER";
		String title = "COMPUTER";
		LocalDateTime createdAt = LocalDateTime.now();
		String createdBy = "AdinServer";

		Category category = new Category();
		category.setType(type);
		category.setTitle(title);

		Category newCategory = categoryRepository.save(category);

		System.out.println(newCategory);
	}

	@Test
	public void read(){
//		Optional<Category> optionalCategory = categoryRepository.findById(1L);
		Optional<Category> optionalCategory = categoryRepository.findByType("COMPUTER");
		optionalCategory.ifPresent(selectCategory ->{
			System.out.println(selectCategory.getTitle());
		});
	}
}
