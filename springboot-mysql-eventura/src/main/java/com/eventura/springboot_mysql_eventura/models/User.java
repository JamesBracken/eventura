package com.eventura.springboot_mysql_eventura.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

@Entity(name="Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNo;
    private boolean isAdminUser;
    private Date dob;
    private Long addressId;
    private Date createdDate;
    private Date updatedDate;
    private Date deletedDate ;

}
