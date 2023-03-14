package com.app.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

public class BookingDTO {

	private String venue;
	
//	private Date date;
	
	private String status="Pending";
	
	private LocalDate EventDate;

	
	

	public BookingDTO() {
		super();
	}

	public BookingDTO(String venue,LocalDate EventDate) {
		super();
		this.venue = venue;
		this.EventDate=EventDate;
		
	}

	public String getVenue() {
		return venue;
	}

	public void setVenue(String venue) {
		this.venue = venue;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDate getEventDate() {
		return EventDate;
	}

	public void setEventDate(LocalDate eventDate) {
		EventDate = eventDate;
	}

	@Override
	public String toString() {
		return "BookingDTO [venue=" + venue + ", status=" + status + ", EventDate=" + EventDate + "]";
	}
	
	

//	public Date getDate() {
//		return date;
//	}
//
//	public void setDate(Date date) {
//		this.date = date;
//	}

	
	
	

	

}
