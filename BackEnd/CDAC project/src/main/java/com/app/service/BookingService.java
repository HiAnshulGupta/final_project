package com.app.service;

import java.util.List;

import com.app.dto.BookingDTO;
import com.app.pojos.Bookings;

public interface BookingService {

List<Bookings> getAllBookingDetails(); 
	
	String deleteBooking(Long id);

	Bookings addNewBooking(BookingDTO booking);

	String deleteVendor(Long id);	
	
	Bookings addBooking(BookingDTO booking,Long customerId, Long serviceId,Long catalogueID);
	
	List<Bookings>getAllBookingsById(Long customerId);
	
	String updateStatusOfBooking(Long bookingId,Long vendorID);
	
	
	
	
}
