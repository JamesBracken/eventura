package com.eventura.springboot_mysql_eventura.models;

import jakarta.persistence.*;

@Entity(name = "Bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;
    private short noOfEventTickets; // CHANGE NAMING
    private Double totalCost;   // CHANGE NAMING
    private boolean isCancelled = false; // CHANGE NAMING

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    public Booking(short noOfEventTickets, double totalCost, boolean isCancelled, User user,Event event) {
        this.noOfEventTickets = noOfEventTickets;
        this.totalCost =  totalCost;
        this.isCancelled = isCancelled;
        this.user = user;
        this.event = event;
    }

    public Booking(){}

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public short getNoOfEventTickets() {
        return noOfEventTickets;
    }

    public void setNoOfEventTickets(short noOfEventTickets) {
        this.noOfEventTickets = noOfEventTickets;
    }

    public Double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public boolean isCancelled() {
        return this.isCancelled;
    }

    public void setIsCancel(boolean isCancel) {
        this.isCancelled = isCancel;
    }

}
