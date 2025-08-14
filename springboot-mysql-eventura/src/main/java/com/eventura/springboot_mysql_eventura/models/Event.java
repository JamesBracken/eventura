package com.eventura.springboot_mysql_eventura.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventName;
    private String eventDescription;

    @ManyToOne
    @JoinColumn(name = "organiser")
    private User organiser; // maps organiser to a User entity

    private Integer noOfEventDates;
    private Integer maxCapacity;
    private Double costPerPerson;

    @ManyToOne
    @JoinColumn(name = "address", nullable = true)
    private Address address; // link to Address entity

@Column(name = "location")
private String location;

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @ManyToOne
    @JoinColumn(name = "createdBy")
    private User createdBy;

    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    // Getters and setters...

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEventName() { return eventName; }
    public void setEventName(String eventName) { this.eventName = eventName; }

    public String getEventDescription() { return eventDescription; }
    public void setEventDescription(String eventDescription) { this.eventDescription = eventDescription; }

    public User getOrganiser() { return organiser; }
    public void setOrganiser(User organiser) { this.organiser = organiser; }

    public Integer getNoOfEventDates() { return noOfEventDates; }
    public void setNoOfEventDates(Integer noOfEventDates) { this.noOfEventDates = noOfEventDates; }

    public Integer getMaxCapacity() { return maxCapacity; }
    public void setMaxCapacity(Integer maxCapacity) { this.maxCapacity = maxCapacity; }

    public Double getCostPerPerson() { return costPerPerson; }
    public void setCostPerPerson(Double costPerPerson) { this.costPerPerson = costPerPerson; }

    public Address getAddress() { return address; }
    public void setAddress(Address address) { this.address = address; }

    public User getCreatedBy() { return createdBy; }
    public void setCreatedBy(User createdBy) { this.createdBy = createdBy; }

    public LocalDateTime getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDateTime createdDate) { this.createdDate = createdDate; }

    public LocalDateTime getUpdatedDate() { return updatedDate; }
    public void setUpdatedDate(LocalDateTime updatedDate) { this.updatedDate = updatedDate; }
}