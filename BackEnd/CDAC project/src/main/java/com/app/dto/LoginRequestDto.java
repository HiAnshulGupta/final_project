
package com.app.dto;

public class LoginRequestDto {
	// data members MUST MATCH with JSON prop names
	private String email;
	private String password;
	
	public LoginRequestDto(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}
	
	public LoginRequestDto() {
		super();
		
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
	
	
	
}
