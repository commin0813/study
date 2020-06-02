package com.example.study.service;

import com.example.study.model.entity.Partner;
import com.example.study.model.network.Header;
import com.example.study.model.network.request.PartnerApiRequest;
import com.example.study.model.network.response.PartnerApiResponse;
import com.example.study.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PartnerApiLogicService extends BaseService<PartnerApiRequest, PartnerApiResponse, Partner> {

	@Autowired
	CategoryRepository categoryRepository;

	@Override
	public Header<PartnerApiResponse> create(Header<PartnerApiRequest> request) {
		PartnerApiRequest partnerApiRequest = request.getData();
		Partner partner = Partner.builder().partnerNumber(partnerApiRequest.getPartnerNumber())
				.address(partnerApiRequest.getAddress())
				.businessNumber(partnerApiRequest.getBusinessNumber())
				.callCenter(partnerApiRequest.getCallCenter())
				.category(categoryRepository.getOne(partnerApiRequest.getCategoryId()))
				.ceoName(partnerApiRequest.getCeoName())
				.name(partnerApiRequest.getName())
				.status(partnerApiRequest.getStatus())
				.build();
		return Header.OK(response(partner));
	}

	@Override
	public Header<PartnerApiResponse> read(Long id) {
		return baseRepository.findById(id).map(partner -> response(partner)).map(Header::OK).orElseGet(() -> Header.ERROR("No Data"));
	}

	@Override
	public Header<PartnerApiResponse> update(Header<PartnerApiRequest> request) {
		PartnerApiRequest partnerApiRequest = request.getData();
		Optional<Partner> optionalPartner = baseRepository.findById(partnerApiRequest.getId());
		return optionalPartner.map(partner -> {
			partner.setCeoName(partner.getCeoName())
					.setAddress(partner.getAddress())
					.setName(partner.getName())
					.setCallCenter(partner.getCallCenter())
					.setStatus(partner.getStatus())
					.setBusinessNumber(partner.getBusinessNumber())
					.setCategory(partner.getCategory())
					.setPartnerNumber(partner.getPartnerNumber());
			return response(partner);
		}).map(Header::OK).orElseGet(() -> Header.ERROR("No data"));
	}

	@Override
	public Header delete(Long id) {
		return baseRepository.findById(id).map(selectedPartner -> {
			baseRepository.delete(selectedPartner);
			return Header.OK();
		}).orElseGet(() -> Header.ERROR("No data"));
	}

	@Override
	public Header<List<PartnerApiResponse>> search(Pageable pageable) {
		Page<Partner> partners = baseRepository.findAll(pageable);
		List<PartnerApiResponse> partnerApiResponses = partners.stream()
				.map(partner -> response(partner))
				.collect(Collectors.toList());
		return Header.OK(partnerApiResponses);
	}

	private PartnerApiResponse response(Partner partner) {
		PartnerApiResponse response = PartnerApiResponse.builder()
				.id(partner.getId())
				.address(partner.getAddress())
				.businessNumber(partner.getBusinessNumber())
				.callCenter(partner.getCallCenter())
				.ceoName(partner.getCeoName())
				.name(partner.getName())
				.partnerNumber(partner.getPartnerNumber())
				.status(partner.getStatus())
				.registeredAt(partner.getRegisteredAt())
				.unRegisteredAt(partner.getUnregisteredAt())
				.categoryId(partner.getId())
				.build();

		return response;
	}
}
