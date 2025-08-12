package com.eventura.springboot_mysql_eventura.controllers;

import com.eventura.springboot_mysql_eventura.models.Address;
import com.eventura.springboot_mysql_eventura.services.AddressService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {
    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping
    public Address createAddress(@RequestBody Address address) {
        return addressService.createAddress(address);
    }

    @PutMapping("/{id}")
    public Address UpdateAddress(@PathVariable Long id, @RequestBody Address address) {
        return addressService.updateAddress(id,address);
    }

    @GetMapping
    public List<Address> getAllAddress() {
        return addressService.getAllAddresses();
    }

    @GetMapping("/{id}")
    public Address getAddressById(@PathVariable Long id) {
        return addressService.getAddressById(id);
    }

//        @GetMapping("/byAddress1AndPostcode/{addressLine1, postcode}")
//        public Address getAddressByAddressLine1AndPostcode(@PathVariable String addressLine1,String postcode ) {
//            return addressService.getAddressByAddressLine1AndPostcode(addressLine1,postcode);
//        }

    @DeleteMapping("/{id}")
    public String deleteAddress(@PathVariable Long id) {
        addressService.deleteAddress(id);
        return String.format("Address with ID: %d has been deleted", id);
    }
}
