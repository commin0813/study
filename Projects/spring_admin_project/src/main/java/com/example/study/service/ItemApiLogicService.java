package com.example.study.service;

import com.example.study.model.entity.Item;
import com.example.study.model.entity.Partner;
import com.example.study.model.network.Header;
import com.example.study.model.network.request.ItemApiRequest;
import com.example.study.model.network.response.ItemApiResponse;
import com.example.study.repository.PartnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ItemApiLogicService extends BaseService<ItemApiRequest, ItemApiResponse, Item> {

	@Autowired
	PartnerRepository partnerRepository;

	@Override
	public Header<ItemApiResponse> create(Header<ItemApiRequest> request) {
		ItemApiRequest itemApiRequest = request.getData();
		Optional<Partner> optionalPartner = partnerRepository.findById(itemApiRequest.getPartnerId());

		return optionalPartner.map(selectedPartner -> {
			Item item = Item.builder()
					.brandName(itemApiRequest.getBrandName())
					.content(itemApiRequest.getContent())
					.name(itemApiRequest.getName())
					.price(itemApiRequest.getPrice())
					.status(itemApiRequest.getStatus())
					.title(itemApiRequest.getTitle())
					.registeredAt(itemApiRequest.getRegisteredAt())
					.unregisteredAt(itemApiRequest.getUnRegisteredAt())
					.partner(selectedPartner)
					.build();
			return baseRepository.save(item);
		}).map(item -> Header.OK(response(item)))
				.orElseGet(() -> Header.ERROR("NoDATA"));
	}

	@Override
	public Header<ItemApiResponse> read(Long id) {
		Optional<Item> optionalItem = baseRepository.findById(id);

		return optionalItem.map(selectedItem -> Header.OK(response(selectedItem))).orElseGet(() -> Header.ERROR("No Data"));
	}

	@Override
	public Header<ItemApiResponse> update(Header<ItemApiRequest> request) {
		ItemApiRequest itemApiRequest = request.getData();
		Optional<Item> optionalItem = baseRepository.findById(itemApiRequest.getId());
		Partner optionalPartner = partnerRepository.getOne(itemApiRequest.getPartnerId());

		try {
			return optionalItem.map(selectedItem -> {

				selectedItem.setBrandName(itemApiRequest.getBrandName())
						.setTitle(itemApiRequest.getTitle())
						.setStatus(itemApiRequest.getStatus())
						.setContent(itemApiRequest.getContent())
						.setName(itemApiRequest.getName())
						.setPrice(itemApiRequest.getPrice())
						.setPartner(optionalPartner);

				return baseRepository.save(selectedItem);
			}).map(item -> Header.OK(response(item)))
					.orElseGet(() -> Header.ERROR("NO DATA"));
		} catch (Exception e) {
			return Header.ERROR(e.getMessage());
		}
	}

	@Override
	public Header delete(Long id) {
		Optional<Item> selectedItem = baseRepository.findById(id);
		return selectedItem.map(item ->
		{
			baseRepository.delete(item);
			return Header.OK();
		}).orElseGet(() -> Header.ERROR("No Data"));

	}

	@Override
	public Header<List<ItemApiResponse>> search(Pageable pageable) {
		Page<Item> items = baseRepository.findAll(pageable);
		List<ItemApiResponse> itemApiResponses = items.stream()
				.map(item -> response(item))
				.collect(Collectors.toList());
		return Header.OK(itemApiResponses);
	}

	public  ItemApiResponse response(Item item) {
		ItemApiResponse response = ItemApiResponse.builder()
				.id(item.getId())
				.brandName(item.getBrandName())
				.content(item.getContent())
				.name(item.getName())
				.partnerId(item.getPartner().getId())
				.price(item.getPrice())
				.registeredAt(item.getRegisteredAt())
				.status(item.getStatus())
				.title(item.getTitle())
				.unregisteredAt(item.getUnregisteredAt())
				.build();

		return response;
	}
}
