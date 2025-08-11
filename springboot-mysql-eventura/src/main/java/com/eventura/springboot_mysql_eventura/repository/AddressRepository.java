package com.eventura.springboot_mysql_eventura.repository;

import com.eventura.springboot_mysql_eventura.models.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
