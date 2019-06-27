package com.example.kodiakNotes.repository;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.kodiakNotes.model.Note;

@Repository
//@CrossOrigin(origins = "http://localhost:4200")
public interface NoteRepository extends JpaRepository<Note, Long> {
	 Page<Note> findByUserId(Long noteId, Pageable pageable);
	 //java.util imported here. Is it ok?
	 Optional<Note> findByIdAndUserId(Long id, Long noteId);
} 
