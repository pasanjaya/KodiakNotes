package com.example.kodiakNotes.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.kodiakNotes.exception.ResourceNotFoundException;
import com.example.kodiakNotes.model.Feedback;
import com.example.kodiakNotes.model.FeedbackData;
import com.example.kodiakNotes.model.Note;
import com.example.kodiakNotes.model.User;
import com.example.kodiakNotes.model.UserData;
import com.example.kodiakNotes.repository.FeedbackRepository;
import com.example.kodiakNotes.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class FeedbackController {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	FeedbackRepository feedbackRepository;
	
	@GetMapping("/feedbacks/{userId}")
    public ArrayList<FeedbackData> getAllFeedbacksByUserId(@PathVariable (value = "userId") Long userId,
                                                Pageable pageable) {
		Optional<User> user = userRepository.findById(userId);
		Page<Feedback> fee=feedbackRepository.findByUserId(userId, pageable);
		
		ArrayList<FeedbackData> arr = new ArrayList<FeedbackData>();
		List<Feedback> feedback = fee.getContent();
		for (int i=0;i<feedback.size();++i) {
			arr.add(new FeedbackData(feedback.get(i).getId(), feedback.get(i).getFeedback(), user.get().getEmail()));
		}
		
        return arr;
    }
	
	@PostMapping("/feedbacks/{userId}")
    public Feedback createNote(@PathVariable (value = "userId") Long userId,
                                 @Valid @RequestBody Feedback feedback) {
        return userRepository.findById(userId).map(user -> {
            feedback.setUser(user);
            return feedbackRepository.save(feedback);
        }).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
    }
	
}
