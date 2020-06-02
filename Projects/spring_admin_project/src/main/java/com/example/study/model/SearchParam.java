package com.example.study.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@AllArgsConstructor
public class SearchParam {
	private String account;
	private String email;
	private int page;

}
