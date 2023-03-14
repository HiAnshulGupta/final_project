package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Admin;


public interface AdminRepository extends JpaRepository<Admin, Long> {

	//finder method for signin
		Optional<Admin> findByEmailAndPassword(String em, String pass);
	
}
