package com.app.service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.BookingDTO;

import com.app.pojos.Bookings;
import com.app.pojos.Catalogue;
import com.app.pojos.Customer;

import com.app.pojos.Vendor;
import com.app.repository.BookingRepository;
import com.app.repository.CatalogueRepository;
import com.app.repository.CustomerRepository;
import com.app.repository.VendorRepository;


@Service
@Transactional
public class BookingServiceImpl implements BookingService {

	@Autowired
	private ModelMapper mapper;
	

	@Autowired
	private BookingRepository bookRepo;
	
	@Autowired
	private CustomerRepository cstmrRepo;
	
	@Autowired
	private CatalogueRepository catalog;
	
	
	
	@Autowired
	private VendorRepository vnd;
	
	@Override
	public List<Bookings> getAllBookingDetails() {
		
		return bookRepo.findAll();
				
	}

	@Override
	public Bookings addNewBooking(BookingDTO booking) {
		
		Bookings bookings=mapper.map(booking, Bookings.class);// DTO --> Entity
		System.out.println(bookings);
		return bookRepo.save(bookings);
	}

	@Override
	public String deleteBooking(Long id) {
		
		System.out.println("in impl " + id);
		bookRepo.deleteById(id);
		return "Deleted Successfully";
		
	}

	@Override
	public String deleteVendor(Long id) {
		// TODO Auto-generated method stub
		bookRepo.deleteById(id);
		
		return "successfully deleted";
	}
	
	@Override
	public Bookings addBooking(BookingDTO booking,Long customerId, Long vendorID,Long catalogueID) {
		
		
		Customer customer=cstmrRepo.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
        Vendor vendor= vnd.findById(vendorID)
				.orElseThrow(()-> new ResourceNotFoundException("Service Not Found"));
        Catalogue ctlg= catalog.findById(vendorID)
				.orElseThrow(()-> new ResourceNotFoundException("Service Not Found"));
        System.out.println(booking.getVenue());
        System.out.println(booking.getEventDate());
      //  System.out.println(booking.getVenue());
        Bookings booking1 = new Bookings();
        booking1.setCustdetail(customer);
        booking1.setVendDetails(vendor);
        booking1.setCatdetail(ctlg);
        booking1.setDobooking(new Date());
        booking1.setStatus(booking.getStatus());
        booking1.setVenue(booking.getVenue());
        booking1.setEventDate(booking.getEventDate());
        return bookRepo.save(booking1);
	}

	@Override
	public List<Bookings> getAllBookingsById(Long customerId) {
		
		Customer customer = cstmrRepo.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
	    return customer.getBookingList();
		
		
	}

	@Override
	public String updateStatusOfBooking(Long bookingId, Long vendorID) {
		// TODO Auto-generated method stub
		
		Bookings b=bookRepo.findById(bookingId).orElseThrow(()->new ResourceNotFoundException("Booking not found"));
		b.setStatus("Accepted");
		Vendor vend=vnd.findById(vendorID).orElseThrow(()->new ResourceNotFoundException("Service provider not found"));
		b.setVendDetails(vend);;
		bookRepo.save(b);

//		sp1.setId(serviceProviderId);
//		spRepo.save(sp1);
		return "Booking accepted and updated status successfully!!!!!!!";
	}

}
