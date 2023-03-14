package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity
@Table(name="cart_items")
@ToString(callSuper = true)
//@NoArgsConstructor
@Getter
@Setter

public class CartItems extends BaseEntity {
	
	
	
	public CartItems() {
		super();
	}


	@Column
	private int quantity;
	
	@Column(name="price")
	private double Price;
	
	
	//CartItem *---->1 Cart
	@ManyToOne
	@JoinColumn(name="cart_id")
	private Cart cart;
	
	
	//CartItem 1--->1 Booking
//		@OneToOne
//		@JoinColumn(name="items")
//		private Bookings bookingItem;


		public int getQuantity() {
			return quantity;
		}


		public void setQuantity(int quantity) {
			this.quantity = quantity;
		}


		public double getPrice() {
			return Price;
		}


		public void setPrice(double price) {
			Price = price;
		}


		public Cart getCart() {
			return cart;
		}


		public void setCart(Cart cart) {
			this.cart = cart;
		}


//		public Bookings getBookingItem() {
//			return bookingItem;
//		}
//
//
//		public void setBookingItem(Bookings bookingItem) {
//			this.bookingItem = bookingItem;
//		}
	
		

}
