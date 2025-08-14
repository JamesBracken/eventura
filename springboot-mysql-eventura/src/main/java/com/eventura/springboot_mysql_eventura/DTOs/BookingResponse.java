package com.eventura.springboot_mysql_eventura.DTOs;

import com.eventura.springboot_mysql_eventura.models.Booking;
import com.eventura.springboot_mysql_eventura.models.Address;
import com.eventura.springboot_mysql_eventura.models.Event;

public class BookingResponse {
    private Long bookingId;
    private short noOfEventTickets;
    private Double totalCost;

    private Long eventId;
    private String eventName;
    private String eventDescription;

    private AddressResponse address;  // nested DTO for event.address

    // constructor
    public BookingResponse(Booking booking) {
        this.bookingId = booking.getBookingId();
        this.noOfEventTickets = booking.getNoOfEventTickets();
        this.totalCost = booking.getTotalCost();

        Event event = booking.getEvent();
        if (event != null) {
            this.eventId = event.getId();
            this.eventName = event.getEventName();
            this.eventDescription = event.getEventDescription();
            this.address = new AddressResponse(event.getAddress());
        }
    }

    // getters only (no setters since it's read-only)
    public Long getBookingId() { return bookingId; }
    public short getNoOfEventTickets() { return noOfEventTickets; }
    public Double getTotalCost() { return totalCost; }
    public Long getEventId() { return eventId; }
    public String getEventName() { return eventName; }
    public String getEventDescription() { return eventDescription; }
    public AddressResponse getAddress() { return address; }

    // inner DTO for event address
    public static class AddressResponse {
        private Long id;
        private String addressLine1;
        private String addressLine2;
        private String postcode;
        private String city;
        private String country;

        public AddressResponse(Address address) {
            if (address != null) {
                this.id = address.getId();
                this.addressLine1 = address.getAddressLine1();
                this.addressLine2 = address.getAddressLine2();
                this.postcode = address.getPostcode();
                this.city = address.getCity();
                this.country = address.getCountry();
            }
        }

        public Long getId() { return id; }
        public String getAddressLine1() { return addressLine1; }
        public String getAddressLine2() { return addressLine2; }
        public String getPostcode() { return postcode; }
        public String getCity() { return city; }
        public String getCountry() { return country; }
    }
}