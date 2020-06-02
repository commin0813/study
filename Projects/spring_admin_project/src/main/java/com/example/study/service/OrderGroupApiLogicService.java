package com.example.study.service;

import com.example.study.ifs.CrudInterface;
import com.example.study.model.entity.OrderGroup;
import com.example.study.model.entity.User;
import com.example.study.model.network.Header;
import com.example.study.model.network.request.OrderGroupApiRequest;
import com.example.study.model.network.response.OrderGroupApiResponse;
import com.example.study.repository.OrderGroupRepository;
import com.example.study.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderGroupApiLogicService implements CrudInterface<OrderGroupApiRequest, OrderGroupApiResponse> {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private OrderGroupRepository orderGroupRepository;


	@Override
	public Header<OrderGroupApiResponse> create(Header<OrderGroupApiRequest> request) {
		OrderGroupApiRequest orderGroupApiRequest = request.getData();
		Optional<User> userOptional = userRepository.findById(orderGroupApiRequest.getUserId());
		return userOptional.map(user -> {
			OrderGroup orderGroup = OrderGroup.builder()
					.status(orderGroupApiRequest.getStatus())
					.revAddress(orderGroupApiRequest.getRevAddress())
					.revName(orderGroupApiRequest.getRevName())
					.paymentType(orderGroupApiRequest.getPaymentType())
					.arrivalDate(orderGroupApiRequest.getArrivalDate())
					.orderType(orderGroupApiRequest.getOrderType())
					.totalPrice(orderGroupApiRequest.getTotalPrice())
					.totalQuantity(orderGroupApiRequest.getTotalQuantity())
					.orderAt(orderGroupApiRequest.getOderAt())
					.user(user)
					.build();
			OrderGroup savedOrderGroup = orderGroupRepository.save(orderGroup);

			return Header.OK(response(savedOrderGroup));
		}).orElseGet(() -> Header.ERROR("No User"));
	}

	@Override
	public Header<OrderGroupApiResponse> read(Long id) {
		Optional<OrderGroup> optionalOrderDetail = orderGroupRepository.findById(id);
		return optionalOrderDetail.map(selectedOrderGroup ->
				response(selectedOrderGroup)
		).map(Header::OK).orElseGet(() -> Header.ERROR("No Data"));
	}

	@Override
	public Header<OrderGroupApiResponse> update(Header<OrderGroupApiRequest> request) {
		OrderGroupApiRequest orderDetailApiRequest = request.getData();
		Optional<OrderGroup> orderDetail = orderGroupRepository.findById(orderDetailApiRequest.getId());

		return orderDetail.map(selectedOrderGroup -> {
			selectedOrderGroup.setStatus(orderDetailApiRequest.getStatus())
					.setRevName(orderDetailApiRequest.getRevName())
					.setTotalQuantity(orderDetailApiRequest.getTotalQuantity())
					.setOrderAt(orderDetailApiRequest.getOderAt())
					.setTotalPrice(orderDetailApiRequest.getTotalPrice())
					.setPaymentType(orderDetailApiRequest.getPaymentType())
					.setRevName(orderDetailApiRequest.getRevName())
					.setOrderType(orderDetailApiRequest.getOrderType())
					.setUser(userRepository.getOne(orderDetailApiRequest.getUserId()))
					.setRevAddress(orderDetailApiRequest.getRevAddress());

			return orderGroupRepository.save(selectedOrderGroup);
		}).map(updatedOrderGroup -> Header.OK(response(updatedOrderGroup)))
				.orElseGet(() -> Header.ERROR("No data"));
	}

	@Override
	public Header delete(Long id) {
		Optional<OrderGroup> orderGroup = orderGroupRepository.findById(id);
		return orderGroup.map(orderGroup1 -> {
			orderGroupRepository.delete(orderGroup1);
			return Header.OK();
		}).orElseGet(() -> Header.ERROR("No Data"));
	}

	@Override
	public Header<List<OrderGroupApiResponse>> search(Pageable pageable) {
		Page<OrderGroup> orderGroups = orderGroupRepository.findAll(pageable);
		List<OrderGroupApiResponse> orderGroupApiResponses = orderGroups.stream()
				.map(orderGroup -> response(orderGroup))
				.collect(Collectors.toList());
		return Header.OK(orderGroupApiResponses);
	}

	 public OrderGroupApiResponse response(OrderGroup orderGroup) {
		OrderGroupApiResponse response = OrderGroupApiResponse.builder()
				.id(orderGroup.getId())
				.status(orderGroup.getStatus())
				.totalPrice(orderGroup.getTotalPrice())
				.oderAt(orderGroup.getCreatedAt())
				.orderType(orderGroup.getOrderType())
				.paymentType(orderGroup.getPaymentType())
				.revAddress(orderGroup.getRevAddress())
				.revName(orderGroup.getRevName())
				.totalQuantity(orderGroup.getTotalQuantity())
				.userId(orderGroup.getUser().getId())
				.build();

		return response;
	}
}
