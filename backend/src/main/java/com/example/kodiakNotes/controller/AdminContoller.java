package com.example.kodiakNotes.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.kodiakNotes.exception.ResourceNotFoundException;
import com.example.kodiakNotes.model.Admin;
import com.example.kodiakNotes.model.User;
import com.example.kodiakNotes.repository.AdminRepository;

@RestController
public class AdminContoller {

	@Autowired
	private AdminRepository adminRepository;
	
	@PostMapping("/authenticateAdmin")
	public long autheticateAdmin(@Valid @RequestBody Admin adminAuth ) {
		List<Admin> lst = adminRepository.findAll();
		Admin adminFound=null;
		for(int i=0;i<lst.size();++i) {
			if(lst.get(i).getEmail().equals(adminAuth.getEmail()) && lst.get(i).getPassword().equals(adminAuth.getPassword())) {
				adminFound = lst.get(i);
				break;
			}
		}
		
		if(adminFound == null) {
			throw new ResourceNotFoundException("Admin ", "email", adminAuth.getEmail());
		}
		else {
			return adminFound.getId();
		}
	}
	
	@PostMapping("/saveAdmin")
	public Admin createNote(@Valid @RequestBody Admin admin) {
        return adminRepository.save(admin);
    }
}
