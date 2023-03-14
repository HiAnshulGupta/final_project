package com.app.pojos;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@Table(name="Customer_table")
@ToString(callSuper = true, exclude = "password")
//@NoArgsConstructor
@Getter
@Setter
public class Customer extends BaseEntity {
	
	public Customer() {
		super();
	}

	@Column(name="c_name",length = 30)
	private String Name;
	
	@Column(name="Mobile_number")
	private long contactNumber;
	@Email
	@Column(name="c_email",length = 30, unique = true)
	private String email;
	
//	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{6,16}$",
//			message = "Password must be between 6 and 16 characters and contain at least 1 uppercase, 1 lowercase, 1 special character, and 1 digit.")

	@Column(name="c_pass",length = 300, nullable = false)
	private String password;
	
	
	@Column(name="c_address",length = 30)
	private String Address;
	
//	 customer 1--->* bookings
	@OneToMany(mappedBy = "custdetail", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<Bookings> bookingList = new ArrayList<Bookings>();
	
	// customer 1--->1 Cart
		@OneToOne(mappedBy = "customers", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
		private Cart cart;
		
//		@ElementCollection // Mandatory o.w : HIb throws MappingExc
//		@CollectionTable(name = "payment_cards", 
//		joinColumns = @JoinColumn(name = "user_id"))
//		private List<PaymentCard> paymentCards = new ArrayList<>();

	
	
	public Customer(String name, long contactNumber, String email, String password, String address) {
		super();
		Name = name;
		this.contactNumber = contactNumber;
		this.email = email;
		this.password = password;
		Address = address;
	}




	public String getName() {
		return Name;
	}




	public void setName(String name) {
		Name = name;
	}




	public long getContactNumber() {
		return contactNumber;
	}




	public void setContactNumber(long contactNumber) {
		this.contactNumber = contactNumber;
	}




	public String getEmail() {
		return email;
	}




	public void setEmail(String email) {
		this.email = email;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}

	public String getAddress() {
		return Address;
	}


	public void setAddress(String address) {
		Address = address;
	}

	public List<Bookings> getBookingList() {
		return bookingList;
	}
//
//
//	public void setBookingList(List<Bookings> bookingList) {
//		this.bookingList = bookingList;
//	}


	public Cart getCart() {
		return cart;
	}


	public void setCart(Cart cart) {
		this.cart = cart;
	}
	


}
