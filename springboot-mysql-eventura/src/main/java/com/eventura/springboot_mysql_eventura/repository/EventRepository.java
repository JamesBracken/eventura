package com.eventura.springboot_mysql_eventura.repository;

import com.eventura.springboot_mysql_eventura.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
}
