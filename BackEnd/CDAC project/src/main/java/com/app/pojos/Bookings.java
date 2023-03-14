package com.app.pojos;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import com.app.pojos.PaymentCard;

import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Booking")
public class Bookings extends BaseEntity {

	@Column(name = "Event_venue", length = 30)
	private String venue;

	@Column(name = "Dobooking")
	private Date Dobooking;

	@Column(name = "EventDate")
	private LocalDate EventDate;

	@ManyToOne
	@JoinColumn(name = "V_id")
	@JsonBackReference
	private Vendor vendDetails;

	@ManyToOne
	@JoinColumn(name = "C_id")
	@JsonBackReference
	private Customer custdetail;

	@OneToOne
	@JoinColumn(name = "catalog_ID")
	@JsonBackReference
	private Catalogue catdetail;

//	@OneToOne(mappedBy = "bookingItem")
//	@JsonBackReference
//	private CartItems items;

	@OneToOne
	@JoinColumn(name = "payment_id")
	private PaymentCard payment_id;

	private String status = "Pending";

	public Bookings() {
		super();
	}

	

	public Bookings(String venue, Date dobooking, LocalDate eventDate, Vendor vendDetails, Customer custdetail,
			Catalogue catdetail, PaymentCard payment_id, String status) {
		super();
		this.venue = venue;
		Dobooking = dobooking;
		EventDate = eventDate;
		this.vendDetails = vendDetails;
		this.custdetail = custdetail;
		this.catdetail = catdetail;
		this.payment_id = payment_id;
		this.status = status;
	}



	@Override
	public String toString() {
		return "Bookings [venue=" + venue + ", Dobooking=" + Dobooking + ", vendDetails=" + vendDetails
				+ ", custdetail=" + custdetail + ", items=" + ", payment_id=" + payment_id + ", status=" + status + "]";
	}

	public String getVenue() {
		return venue;
	}

	public void setVenue(String venue) {
		this.venue = venue;
	}

	public Date getDobooking() {
		return Dobooking;
	}

	public void setDobooking(Date dobooking) {
		Dobooking = dobooking;
	}

	public Vendor getVendDetails() {
		return vendDetails;
	}

	public void setVendDetails(Vendor vendDetails) {
		this.vendDetails = vendDetails;
	}

	public Customer getCustdetail() {
		return custdetail;
	}

	public void setCustdetail(Customer custdetail) {
		this.custdetail = custdetail;
	}

//	public CartItems getItems() {
//		return items;
//	}
//
//	public void setItems(CartItems items) {
//		this.items = items;
//	}

	public PaymentCard getPayment_id() {
		return payment_id;
	}

	public void setPayment_id(PaymentCard payment_id) {
		this.payment_id = payment_id;
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

	public Catalogue getCatdetail() {
		return catdetail;
	}

	public void setCatdetail(Catalogue catdetail) {
		this.catdetail = catdetail;
	}

}
