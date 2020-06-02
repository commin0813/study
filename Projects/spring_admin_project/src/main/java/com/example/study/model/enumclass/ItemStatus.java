package com.example.study.model.enumclass;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ItemStatus {
	REGISTERED(0,"등록상태","사용자 등록상태"),
	UNREGISTERED(1,"해지","해지상태"),
	READY(2,"상품준비","상품준비상태"),
	WAITING(3,"상품등록대기중","상품등록대기중");

	private int id;
	private String title;
	private String description;


}
