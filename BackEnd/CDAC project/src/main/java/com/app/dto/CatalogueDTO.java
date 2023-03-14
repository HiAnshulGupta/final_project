package com.app.dto;

import javax.persistence.Column;

public class CatalogueDTO {
	
	private String EventName;
	
	private double rate;
	
	private Long id;
	
	
	
	
	public CatalogueDTO() {
		super();
	}


	public CatalogueDTO(String eventName, double rate,Long id) {
		super();
		EventName = eventName;
		this.rate = rate;
	
		
	}
	
	public Long getid() {
		return id;
	}


	public void setid(Long V_id) {
		this.id = V_id;
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


	
	
	

	

}
