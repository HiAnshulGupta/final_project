
package com.app.pojos;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@MappedSuperclass // mandatory cls level anno to tell hibernate that following is a common base
					// class to extend entities , no table generation
//@Getter
//@Setter
//@ToString
public class BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	
	
	public BaseEntity() {
		super();
	}
	
	

	public BaseEntity(Long id) {
		super();
		this.id = id;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	
	
}
