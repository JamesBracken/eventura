package com.eventura.springboot_mysql_eventura.repository;

import com.eventura.springboot_mysql_eventura.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
