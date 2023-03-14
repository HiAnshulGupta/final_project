package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.app.pojos.Vendor;

public interface VendorRepository extends JpaRepository<Vendor, Long>{

	//finder method for signin
			Optional<Vendor> findByEmail(String em);
}
