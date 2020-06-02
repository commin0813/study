package com.example.study.controller;


import com.example.study.model.SearchParam;
import com.example.study.model.network.Header;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api")
public class GetController {
	@RequestMapping(method = RequestMethod.GET , path = "/getMethod")
	public String getRequest(){
	return "Hi GetMethod";
	}
	@GetMapping("/getParameter")
	public String getPrameter(@RequestParam String id,@RequestParam String password){
		System.out.println(String.format("ID:%s,PW:%s",id,password));
		return id+ "   "+password;
	}
	@GetMapping("/getMultiParameter")
	public SearchParam getMultiParameter(SearchParam searchParam){
		System.out.println(searchParam.getAccount()+searchParam.getEmail()+searchParam.getPage());
	return  searchParam;
	}

	@GetMapping("/header")
	public Header getHeader(){
		return Header.builder().resultCode("OK").transactionTime(LocalDateTime.now()).description("OK").build();
	}
}
