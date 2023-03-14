package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.dto.CustomerDTO;
import com.app.pojos.Customer;


public interface CustomerRepository extends JpaRepository<Customer, Long>  {

	//finder method for signin
	Optional<Customer> findByEmail(String em);
//	Optional<Customer> findByCustEmail(String em);


	Customer save(CustomerDTO cstmr);
}
