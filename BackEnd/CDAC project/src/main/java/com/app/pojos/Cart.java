package com.app.pojos;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name = "carts")
public class Cart extends BaseEntity{
	
	
	public Cart() {
		super();
	}

	@Column(name = "total_Events")
	private int totalEvents;
	
	@Column(name = "total_cart_price")
	private double totalCartPrice;
	
	// Cart 1--->1 Customer
	@OneToOne
	@JoinColumn(name = "customer_id") // to specify FK col name
	private Customer customers;
	
	// Cart 1<----->* CartItems parent , inverse
	
		@OneToMany(mappedBy = "cart",cascade = CascadeType.ALL,orphanRemoval = true)
		private List<CartItems> bookedItems = new ArrayList<>();

		public int getTotalEvents() {
			return totalEvents;
		}

		public void setTotalEvents(int totalEvents) {
			this.totalEvents = totalEvents;
		}

		public double getTotalCartPrice() {
			return totalCartPrice;
		}

		public void setTotalCartPrice(double totalCartPrice) {
			this.totalCartPrice = totalCartPrice;
		}

		public Customer getCustomers() {
			return customers;
		}

		public void setCustomers(Customer customers) {
			this.customers = customers;
		}

		public List<CartItems> getBookedItems() {
			return bookedItems;
		}

		public void setBookedItems(List<CartItems> bookedItems) {
			this.bookedItems = bookedItems;
		}
	
	
	
}
