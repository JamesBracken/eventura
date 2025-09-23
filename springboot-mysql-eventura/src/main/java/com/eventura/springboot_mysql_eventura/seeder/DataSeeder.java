package com.eventura.springboot_mysql_eventura.seeder;

import com.eventura.springboot_mysql_eventura.models.Address;
import com.eventura.springboot_mysql_eventura.models.Booking;
import com.eventura.springboot_mysql_eventura.models.Event;
import com.eventura.springboot_mysql_eventura.models.User;
import com.eventura.springboot_mysql_eventura.repository.AddressRepository;
import com.eventura.springboot_mysql_eventura.repository.BookingRepository;
import com.eventura.springboot_mysql_eventura.repository.EventRepository;
import com.eventura.springboot_mysql_eventura.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {
    private final AddressRepository addressRepository;
    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public DataSeeder(AddressRepository addressRepository, BookingRepository bookingRepository, EventRepository eventRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.bookingRepository = bookingRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (addressRepository.count() ==0){
            // to add address - need line 1, line 2, postcode, city, country
            this.addressRepository.saveAndFlush(new Address("30 Nology Road","","N12 LO2","London","UK"));
            this.addressRepository.saveAndFlush(new Address("Flat 1","23 London Road","EC1 7NH","London","UK"));
            this.addressRepository.saveAndFlush(new Address("1 West Road","","W1 P12","London","UK"));
            this.addressRepository.saveAndFlush(new Address("Community Center","Excel Road","S1 P12","South London","UK"));
            this.addressRepository.saveAndFlush(new Address("Flat 2","23 London Road","EC1 7NH","London","UK"));
            this.addressRepository.saveAndFlush(new Address("Flat 3","23 London Road","EC1 7NH","London","UK"));
            this.addressRepository.saveAndFlush(new Address("Flat 4","23 London Road","EC1 7NH","London","UK"));
        }
        if (userRepository.count() ==0){
            LocalDateTime createdDate = LocalDateTime.parse("2025-09-23T09:33:00");
            LocalDateTime updatedDate = LocalDateTime.parse("2025-09-23T09:33:00");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            try {
                Address addressIdJoe = addressRepository.findById(2L).orElseThrow();
                Date dobJoe = sdf.parse("1989-09-23");
                this.userRepository.saveAndFlush(new User("Joe", "Johnson", "JJohnson@example.com", "0122345678", true, dobJoe, createdDate, updatedDate, addressIdJoe));

                Address addressIdMary = addressRepository.findById(5L).orElseThrow();
                Date dobMary = sdf.parse("1998-03-25");
                this.userRepository.saveAndFlush(new User("Mary", "Jones", "MJones@example.com", "0123654677", false, dobMary, createdDate, updatedDate, addressIdMary));

                Address addressIdJane = addressRepository.findById(6L).orElseThrow();
                Date dobJane = sdf.parse("2000-06-10");
                this.userRepository.saveAndFlush(new User("Jane", "Rogers", "JRogers@example.com", "0122223478", false, dobJane, createdDate, updatedDate, addressIdJane));

                Address addressIdNathan = addressRepository.findById(7L).orElseThrow();
                Date dobNathan = sdf.parse("2001-08-04");
                this.userRepository.saveAndFlush(new User("Nathan", "Smith", "NSmith@example.com", "0122396678", false, dobNathan, createdDate, updatedDate, addressIdNathan));
            } catch (ParseException e) {
                    e.printStackTrace(); // or log error properly
            }
        }

        if (eventRepository.count() ==0){
            User organiserId = userRepository.findById(1L).orElseThrow();
            User createdBy = userRepository.findById(1L).orElseThrow();
            LocalDateTime createdDate = LocalDateTime.parse("2025-09-23T09:33:00");
            LocalDateTime updatedDate = LocalDateTime.parse("2025-09-23T09:33:00");
            {
                Address addressId = addressRepository.findById(1L).orElseThrow();
                LocalDateTime startDate = LocalDateTime.parse("2025-10-01T09:00:00");
                LocalDateTime endDate = LocalDateTime.parse("2025-10-01T17:00:00");

                this.eventRepository.saveAndFlush(new Event("Nology Lunch Day", "Celebrating the opening of our new tech hub.",
                        organiserId, 1, 100, 0.0,
                        addressId, "London",
                        createdBy, createdDate, updatedDate, startDate, endDate
                ));
            }
            {
            Address addressId = addressRepository.findById(3L).orElseThrow();
            LocalDateTime startDate   = LocalDateTime.parse("2025-11-15T09:00:00");
            LocalDateTime endDate     = LocalDateTime.parse("2025-11-15T17:00:00");

            this.eventRepository.saveAndFlush(new Event("Park Run","Family friendly park run",
                    organiserId,1,200,0.0,
                    addressId,"West London",
                    createdBy,createdDate,updatedDate,startDate,endDate
            ));
            }
            {
                Address addressId = addressRepository.findById(2L).orElseThrow();
                LocalDateTime startDate   = LocalDateTime.parse("2025-11-15T09:00:00");
                LocalDateTime endDate     = LocalDateTime.parse("2025-11-15T13:00:00");

                this.eventRepository.saveAndFlush(new Event("Coffee Morning","Morning filled with fun and laughter for the entire family",
                        organiserId,1,200,0.0,
                        addressId,"West London",
                        createdBy,createdDate,updatedDate,startDate,endDate
                ));
            }
            {
                Address addressId = addressRepository.findById(2L).orElseThrow();
                LocalDateTime startDate   = LocalDateTime.parse("2026-03-15T09:00:00");
                LocalDateTime endDate     = LocalDateTime.parse("2026-03-15T13:00:00");

                this.eventRepository.saveAndFlush(new Event("Coffee Morning","Morning filled with fun and laughter for the entire family",
                        organiserId,1,200,0.0,
                        addressId,"West London",
                        createdBy,createdDate,updatedDate,startDate,endDate
                ));
            }
            {
                Address addressId = addressRepository.findById(2L).orElseThrow();
                LocalDateTime startDate   = LocalDateTime.parse("2026-06-15T09:00:00");
                LocalDateTime endDate     = LocalDateTime.parse("2026-06-15T13:00:00");

                this.eventRepository.saveAndFlush(new Event("Coffee Morning","Morning filled with fun and laughter for the entire family",
                        organiserId,1,200,0.0,
                        addressId,"West London",
                        createdBy,createdDate,updatedDate,startDate,endDate
                ));
            }
            {
                Address addressId = addressRepository.findById(2L).orElseThrow();
                LocalDateTime startDate   = LocalDateTime.parse("2026-11-15T09:00:00");
                LocalDateTime endDate     = LocalDateTime.parse("2026-11-15T13:00:00");

                this.eventRepository.saveAndFlush(new Event("Coffee Morning","Morning filled with fun and laughter for the entire family",
                        organiserId,1,200,0.0,
                        addressId,"West London",
                        createdBy,createdDate,updatedDate,startDate,endDate
                ));
            }
            {
                Address addressId = addressRepository.findById(2L).orElseThrow();
                LocalDateTime startDate   = LocalDateTime.parse("2025-12-15T09:00:00");
                LocalDateTime endDate     = LocalDateTime.parse("2025-12-15T13:00:00");

                this.eventRepository.saveAndFlush(new Event("Xmas show","Christmas Show with activities",
                        organiserId,1,200,10.0,
                        addressId,"West London",
                        createdBy,createdDate,updatedDate,startDate,endDate
                ));
            }

        }

        if (bookingRepository.count() ==0){
            User userId = userRepository.findById(2L).orElseThrow();
            {
                Event eventId = eventRepository.findById(1L).orElseThrow();
                this.bookingRepository.saveAndFlush(new Booking((short) 1, 0.0, false, userId, eventId));
            }
            {
                Event eventId = eventRepository.findById(2L).orElseThrow();
                this.bookingRepository.saveAndFlush(new Booking((short) 3, 0.0, false, userId, eventId));
            }
            {
                Event eventId = eventRepository.findById(3L).orElseThrow();
                this.bookingRepository.saveAndFlush(new Booking((short) 1, 0.0, false, userId, eventId));
            }
            {
                Event eventId = eventRepository.findById(4L).orElseThrow();
                this.bookingRepository.saveAndFlush(new Booking((short) 4, 0.0, false, userId, eventId));
            }
            {
                Event eventId = eventRepository.findById(5L).orElseThrow();
                this.bookingRepository.saveAndFlush(new Booking((short) 1, 0.0, false, userId, eventId));
            }
            {
                Event eventId = eventRepository.findById(6L).orElseThrow();
                this.bookingRepository.saveAndFlush(new Booking((short) 2, 0.0, false, userId, eventId));
            }

        }

    }

}
