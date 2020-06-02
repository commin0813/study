package com.example.study.service;

import com.example.study.ifs.CrudInterface;
import com.example.study.model.entity.OrderGroup;
import com.example.study.model.entity.User;
import com.example.study.model.enumclass.UserStatus;
import com.example.study.model.network.Header;
import com.example.study.model.network.request.UserApiRequest;
import com.example.study.model.network.response.ItemApiResponse;
import com.example.study.model.network.response.OrderGroupApiResponse;
import com.example.study.model.network.response.UserApiResponse;
import com.example.study.model.network.response.UserOrderInfoApiResponse;
import com.example.study.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserApiLogicService implements CrudInterface<UserApiRequest, UserApiResponse> {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private OrderGroupApiLogicService orderGroupApiLogicService;

	@Autowired
	private ItemApiLogicService itemApiLogicService;

	@Override
	public Header<UserApiResponse> create(Header<UserApiRequest> request) {
		UserApiRequest userApiRequest = request.getData();

		User user = User.builder()
				.account(userApiRequest.getAccount())
				.password(userApiRequest.getPassword())
				.status(UserStatus.REGISTERED)
				.phoneNumber(userApiRequest.getPhoneNumber())
				.email(userApiRequest.getEmail())
				.registeredAt(LocalDateTime.now())
				.build();
		User newUser = userRepository.save(user);

		return Header.OK(response(newUser));
	}

	@Override
	public Header<UserApiResponse> read(Long id) {
		Optional<User> optional = userRepository.findById(id);
		return optional.map(user -> Header.OK(response(user))).orElseGet(() -> Header.ERROR("No data"));
	}

	@Override
	public Header<UserApiResponse> update(Header<UserApiRequest> request) {

		UserApiRequest userApiRequest = request.getData();
		Optional<User> selectedUser = userRepository.findById(userApiRequest.getId());

		return selectedUser.map(user -> {
			user.setAccount(userApiRequest.getAccount())
					.setPhoneNumber(userApiRequest.getPhoneNumber())
					.setStatus(userApiRequest.getStatus())
					.setPassword(userApiRequest.getPassword())
					.setEmail(userApiRequest.getEmail())
					.setRegisteredAt(userApiRequest.getRegisteredAt())
					.setUnregisteredAt(userApiRequest.getUnRegisteredAt());
			return user;
		}).map(user -> userRepository.save(user))
				.map(updatedUser -> Header.OK(response(updatedUser)))
				.orElseGet(() -> Header.ERROR("No data"));

	}

	@Override
	public Header delete(Long id) {

		Optional<User> optionalUser = userRepository.findById(id);
		return optionalUser.map(user -> {
			userRepository.delete(user);
			return Header.OK();
		})
				.orElseGet(() -> Header.ERROR("No Data"));

	}

	private UserApiResponse response(User user) {
		UserApiResponse response = UserApiResponse.builder()
				.id(user.getId())
				.account(user.getAccount())
				.password(user.getPassword())
				.email(user.getEmail())
				.phoneNumber(user.getPhoneNumber())
				.status(user.getStatus())
				.registeredAt(user.getRegisteredAt())
				.unRegisteredAt(user.getUnregisteredAt())
				.build();

		return response;
	}

	public Header<List<UserApiResponse>> search(Pageable pageable) {
		Page<User> users = userRepository.findAll(pageable);
		List<UserApiResponse> userApiResponses = users.stream()
				.map(user -> response(user))
				.collect(Collectors.toList());
		return Header.OK(userApiResponses);
	}

	public Header<UserOrderInfoApiResponse> orderInfo(Long id) {
		User user = userRepository.getOne(id);
		UserApiResponse userApiResponse = response(user);

		List<OrderGroup> orderGroupList = user.getOrderGroupList();
		List<OrderGroupApiResponse> orderGroupApiResponseList = orderGroupList.stream()
				.map(orderGroup -> {
					OrderGroupApiResponse orderGroupApiResponse = orderGroupApiLogicService.response(orderGroup);
					List<ItemApiResponse> itemApiResponseList = orderGroup.getOrderDetailList().stream()
							.map(detail -> {
								return itemApiLogicService.response(detail.getItem());
							}).collect(Collectors.toList());
					orderGroupApiResponse.setItemApiResponseList(itemApiResponseList);
					return orderGroupApiResponse;
				})
				.collect(Collectors.toList());
		userApiResponse.setOrderGroupApiResponseList(orderGroupApiResponseList);

		UserOrderInfoApiResponse userOrderInfoApiResponse = UserOrderInfoApiResponse.builder()
				.user(userApiResponse)
				.build();
		return Header.OK(userOrderInfoApiResponse);
	}
}
