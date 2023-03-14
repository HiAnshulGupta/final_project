package com.app.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Bookings;


public interface BookingRepository extends JpaRepository<Bookings, Long>  {

	
}