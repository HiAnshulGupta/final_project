package com.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BookingDTO;

import com.app.pojos.Bookings;
import com.app.service.BookingService;
import com.app.service.CustomerService;
import com.app.service.VendorService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/booking")
public class BookingController {

	@Autowired
	private BookingService bookservice;

	@Autowired
	private CustomerService cstmr;

	@Autowired
	private VendorService vnd;

	public BookingController() {
		System.out.println("in def ctor of " + getClass());
	}

	@GetMapping
	public List<Bookings> getBooking() {
		System.out.println("in get bookings");
		return bookservice.getAllBookingDetails();
	}

	@PostMapping
	public Bookings addbookings(BookingDTO bkg) {
		System.out.println("in bookings" + bkg);
		return bookservice.addNewBooking(bkg);
	}

	@DeleteMapping("/{id}")
	public String deleteVendor(@PathVariable Long id) {
		return bookservice.deleteVendor(id);
	}

	@PostMapping("/{customerId}/{vendorID}/{catalogID}")
	public ResponseEntity<Void> addBooking(@RequestBody BookingDTO booking, @PathVariable Long customerId,
			@PathVariable Long vendorID, @PathVariable Long catalogID) {
		bookservice.addBooking(booking, customerId, vendorID, catalogID);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/{customerId}/bookings")
	public List<Bookings> getBookingsForCustomer(@PathVariable Long customerId) {
		return cstmr.getAllBookingsById(customerId);
//	    Customer customer = custRepo.findById(customerId).orElseThrow();
//	    return customer.getBookings();

	}

	@PutMapping("/updateStatus/{bookingId}/{vendorID}")
	public String updateStatusToAccepted(@RequestBody @PathVariable("bookingId") Long bookingId,
			@PathVariable("vendorID") Long serviceProviderId) {
		bookservice.updateStatusOfBooking(bookingId, serviceProviderId);
		return "Booking accepted and updated status successfully!!!!!!!";
	}

}
