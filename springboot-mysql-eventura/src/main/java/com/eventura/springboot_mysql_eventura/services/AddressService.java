package com.eventura.springboot_mysql_eventura.services;

import com.eventura.springboot_mysql_eventura.models.Address;
import com.eventura.springboot_mysql_eventura.repository.AddressRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class AddressService {
    private final AddressRepository addressRepo;

    public AddressService(AddressRepository userRepository) {
        this.addressRepo = userRepository;
    }

    // Create
    public Address createAddress(Address address) {
        // Basic Validation
        if (!(StringUtils.hasText(address.getPostcode()) && StringUtils.hasText(address.getAddressLine1()))) {
            throw new IllegalArgumentException("Address line 1 or postcode are required");
        }
        if (addressRepo.existsByAddressLine1AndPostcode(address.getAddressLine1(), address.getPostcode())) {
            throw new IllegalArgumentException("Address line 1 and postcode already in use:" + address.getAddressLine1() + address.getPostcode());
        }
        return addressRepo.save(address);
    }

    // READ
    public Address getAddressById(Long id) {
        return addressRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format(
                        "Address with ID: %d, was not found", id)));
    }

    public List<Address> getAllAddresses() {
        return addressRepo.findAll();
    }

    //UPDATE -> Patch (Partial) - Put (complete ie erase if exists or create
    // if does not exist)

    public Address updateAddress(Long id, Address newAddress) {
        Address existing = addressRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format(
                        "Address with ID: %d, was not found", id)));

        if (StringUtils.hasText(newAddress.getAddressLine1()))  {
            existing.setAddressLine1(newAddress.getAddressLine1());
        }
        if (StringUtils.hasText(newAddress.getAddressLine2()))  {
            existing.setAddressLine2(newAddress.getAddressLine2());
        }
        if (StringUtils.hasText(newAddress.getPostcode()))  {
            existing.setPostcode(newAddress.getPostcode());
        }
        if (StringUtils.hasText(newAddress.getCity()))  {
            existing.setCity(newAddress.getCity());
        }
        if (StringUtils.hasText(newAddress.getCountry()))  {
            existing.setCountry(newAddress.getCountry());
        }

        return addressRepo.save(existing);
    }


    //DELETE
    public void deleteAddress(Long id) {
        if (!addressRepo.existsById(id)) {
            throw new EntityNotFoundException(String.format(
                    "Address with ID: %d, was not found", id));
        }
        addressRepo.deleteById(id);
    }
}
