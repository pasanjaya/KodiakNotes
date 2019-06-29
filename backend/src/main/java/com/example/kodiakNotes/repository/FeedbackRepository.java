package com.example.kodiakNotes.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.kodiakNotes.model.Feedback;
import com.example.kodiakNotes.model.Note;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
	Page<Feedback> findByUserId(Long userId, Pageable pageable);
	 //java.util imported here. Is it ok?
	 Optional<Feedback> findByIdAndUserId(Long id, Long userId);
}
