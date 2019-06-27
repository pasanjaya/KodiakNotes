package com.example.kodiakNotes.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.kodiakNotes.exception.ResourceNotFoundException;
import com.example.kodiakNotes.model.Note;
import com.example.kodiakNotes.model.User;
import com.example.kodiakNotes.repository.UserRepository;

@RestController
public class UserController {

	@Autowired
	private UserRepository userRepository;
	
	@PostMapping("/authenticate")
	public long autheticateUser(@Valid @RequestBody User userAuth ) {
		List<User> lst = userRepository.findAll();
		User usrFound=null;
		for(int i=0;i<lst.size();++i) {
			if(lst.get(i).getEmail().equals(userAuth.getEmail()) && lst.get(i).getPassword().equals(userAuth.getPassword())) {
				usrFound = lst.get(i);
				break;
			}
		}
		
		if(usrFound == null) {
			throw new ResourceNotFoundException("User ", "email", userAuth.getEmail());
		}
		else {
			return usrFound.getId();
		}
//		return userRepository.findById(userAuth.getId())
//                .orElseThrow(() -> new ResourceNotFoundException("Note", "id", userAuth.getId()));
	}
	
	@PostMapping("/saveUser")
	public User createNote(@Valid @RequestBody User user) {
        return userRepository.save(user);
    }
}
