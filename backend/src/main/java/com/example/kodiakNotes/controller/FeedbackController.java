package com.example.kodiakNotes.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.kodiakNotes.exception.ResourceNotFoundException;
import com.example.kodiakNotes.model.Feedback;
import com.example.kodiakNotes.model.Note;
import com.example.kodiakNotes.repository.FeedbackRepository;
import com.example.kodiakNotes.repository.UserRepository;

@RestController
public class FeedbackController {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	FeedbackRepository feedbackRepository;
	
	@GetMapping("/feedbacks/{userId}")
    public Page<Feedback> getAllFeedbacksByUserId(@PathVariable (value = "userId") Long userId,
                                                Pageable pageable) {
        return feedbackRepository.findByUserId(userId, pageable);
    }
	
	@PostMapping("/feedbacks/{userId}")
    public Feedback createNote(@PathVariable (value = "userId") Long userId,
                                 @Valid @RequestBody Feedback feedback) {
        return userRepository.findById(userId).map(user -> {
            feedback.setUser(user);
            return feedbackRepository.save(feedback);
        }).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
    }
	
//	@PostMapping("/feedbacks/{userId}")
//    public String createNote(@PathVariable (value = "userId") Long userId,
//                                 @Valid @RequestBody Feedback feedback) {
//		System.out.println("ouuuouuouo");
//        return "i am here";
//    }
}
