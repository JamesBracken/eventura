package com.eventura.springboot_mysql_eventura.repository;

import com.eventura.springboot_mysql_eventura.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findAllByUserId(Long user_id);
}
