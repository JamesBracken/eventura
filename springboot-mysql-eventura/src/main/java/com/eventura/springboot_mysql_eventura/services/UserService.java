package com.eventura.springboot_mysql_eventura.services;

import com.eventura.springboot_mysql_eventura.models.User;
import com.eventura.springboot_mysql_eventura.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import java.time.LocalDateTime;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepo;

    public UserService(UserRepository userRepository) {
        this.userRepo = userRepository;
    }

    // Create
    public User createUser(User user) {
        // Basic Validation
        if (!(StringUtils.hasText(user.getFirstName()) && StringUtils.hasText(user.getLastName())) || !StringUtils.hasText(user.getEmail())) {
            throw new IllegalArgumentException("First & last Name or email are required");
        }
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already in use:" + user.getEmail());
        }
        user.setCreatedDate(LocalDateTime.now());  // default the created datetime
        return userRepo.save(user);
    }

    // READ
    public User getUserById(Long id) {
        return userRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format(
                        "User with ID: %d, was not found", id)));
    }

    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("User with email: %s was not found", email)
                ));
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    //UPDATE -> Patch (Partial) - Put (complete ie erase if exists or create
    // if does not exist)

    public User updateUser(Long id, User newUser) {
        User existing = userRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format(
                        "User with ID: %d, was not found", id)));

        if ((StringUtils.hasText(newUser.getFirstName())) && (StringUtils.hasText(newUser.getLastName()))) {
            existing.setFirstName(newUser.getFirstName());
            existing.setLastName(newUser.getLastName());
        }

        if (StringUtils.hasText(newUser.getEmail())) {
            if (existing.getEmail().equals(newUser.getEmail()) && userRepo.existsByEmail(newUser.getEmail())) {
                throw new IllegalArgumentException("Email already in use:" + newUser.getEmail());
            }
            existing.setEmail(newUser.getEmail());
        }
        if (StringUtils.hasText(newUser.getPhoneNo())) {
            existing.setPhoneNo(newUser.getPhoneNo());
        }
        if (newUser.getDob() !=null) {
            existing.setDob(newUser.getDob());
        }

        existing.setAdminUser(newUser.isAdminUser());

        existing.setUpdatedDate(LocalDateTime.now()); // default the updated datatime

        return userRepo.save(existing);
    }


    //DELETE
    public void deleteUser(Long id) {
        if (!userRepo.existsById(id)) {
            throw new EntityNotFoundException(String.format(
                    "User with ID: %d, was not found", id));
        }
        userRepo.deleteById(id);
    }
}
