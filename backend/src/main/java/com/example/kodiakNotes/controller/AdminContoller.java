package com.example.kodiakNotes.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.kodiakNotes.exception.ResourceNotFoundException;
import com.example.kodiakNotes.model.Admin;
import com.example.kodiakNotes.repository.AdminRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AdminContoller {

	@Autowired
	private AdminRepository adminRepository;
	
	@PostMapping("/authenticateAdmin")
	public Map autheticateAdmin(@Valid @RequestBody Admin adminAuth ) {
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
			Map userMap = new HashMap();
			userMap.put("id",adminFound.getId());
			userMap.put("loginType", "admin");
			userMap.put("email",adminFound.getEmail());
			return userMap;
		}
	}
	
	@PostMapping("/saveAdmin")
	public Admin createNote(@Valid @RequestBody Admin admin) {
        return adminRepository.save(admin);
    }
}
