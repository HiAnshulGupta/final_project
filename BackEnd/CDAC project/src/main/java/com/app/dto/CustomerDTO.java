package com.app.dto;

public class CustomerDTO {


	private String Name;
	

	private long contactNumber;
	
	private String email;

	private String password;
	
	private String Address;

	public CustomerDTO() {
		super();
	}

	public CustomerDTO(String name, long contactNumber, String email, String password, String address) {
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
	
	
	
	
}
