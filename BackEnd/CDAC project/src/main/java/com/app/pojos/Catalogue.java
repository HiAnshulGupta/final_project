package com.app.pojos;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.ToString;

@Entity
@Table(name="Catalogue")
//@ToString(callSuper = true)
public class Catalogue extends BaseEntity {
	
	public Catalogue() {
		super();
	}

	@Column(name="EventName",length = 30,unique = true )
	private String EventName;
	
	@Column(name="rate_per_6_hrs")
	private double rate;
	
	@Column(length = 300)
	private String cat_image;
	
	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "vendor_id",nullable = false)
	@JsonBackReference
	private Vendor vendors;
	
	@OneToOne(mappedBy = "catdetail", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
	@JsonBackReference
	private Bookings book;

	public Catalogue(String eventName, double rate, Vendor vendors) {
		super();
		EventName = eventName;
		this.rate = rate;
		this.vendors = vendors;
	}

	public String getEventName() {
		return EventName;
	}

	public void setEventName(String eventName) {
		EventName = eventName;
	}

	public double getRate() {
		return rate;
	}

	public void setRate(double rate) {
		this.rate = rate;
	}

	public Vendor getVendors() {
		return vendors;
	}

	public void setVendors(Vendor vendors) {
		this.vendors = vendors;
	}

	
	
	public Bookings getBook() {
		return book;
	}

	public void setBook(Bookings book) {
		this.book = book;
	}

	public String getCat_image() {
		return cat_image;
	}

	public void setCat_image(String cat_image) {
		this.cat_image = cat_image;
	}

	@Override
	public String toString() {
		return "Catalogue [EventName=" + EventName + ", rate=" + rate + ", vendors=" + vendors + "]";
	}
	
	
	
	
	
	

}
