package com.example.study.model.enumclass;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum OrderType {
	ALL(0,"전부배송","묶음발송(일괄발송)"),
	EACH(1,"개별배송","모든상품을 준비되는순서대로 발송");

	private int id;
	private String title;
	private String description;


}
