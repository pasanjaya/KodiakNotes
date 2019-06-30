package com.example.kodiakNotes.controller;

import com.example.kodiakNotes.exception.ResourceNotFoundException;
import com.example.kodiakNotes.model.Note;
import com.example.kodiakNotes.model.User;
import com.example.kodiakNotes.repository.NoteRepository;
import com.example.kodiakNotes.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
//@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class NoteController {

    @Autowired
    NoteRepository noteRepository;
    
    @Autowired
    UserRepository userRepository;

//    // Get All Notes
//    @GetMapping("/notes")
//    public List<Note> getAllNotes() {
//        return noteRepository.findAll();
//    }
//
//    // Create a new Note
//    @PostMapping("/notes")
//    public Note createNote(@Valid @RequestBody Note note) {
//        return noteRepository.save(note);
//    }
//
//    // Get a Single Note
//    @GetMapping("/notes/{id}")
//    public Note getNoteById(@PathVariable(value = "id") Long noteId) {
//        return noteRepository.findById(noteId)
//                .orElseThrow(() -> new ResourceNotFoundException("Note", "id", noteId));
//    }
//
//    // Update a Note
//    @PutMapping("/notes/{id}")
//    public Note updateNote(@PathVariable(value = "id") Long noteId,
//                                            @Valid @RequestBody Note noteDetails) {
//
//        Note note = noteRepository.findById(noteId)
//                .orElseThrow(() -> new ResourceNotFoundException("Note", "id", noteId));
//
//        note.setTitle(noteDetails.getTitle());
//        note.setContent(noteDetails.getContent());
//
//        Note updatedNote = noteRepository.save(note);
//        return updatedNote;
//    }
//
//    // Delete a Note
//    @DeleteMapping("/notes/{id}")
//    public ResponseEntity<?> deleteNote(@PathVariable(value = "id") Long noteId) {
//        Note note = noteRepository.findById(noteId)
//                .orElseThrow(() -> new ResourceNotFoundException("Note", "id", noteId));
//
//        noteRepository.delete(note);
//
//        return ResponseEntity.ok().build();
//    }
    
    @GetMapping("admin/notes/{userId}")
    public int getNotesCountByUserId(@PathVariable (value = "userId") Long userId,
                                                Pageable pageable) {
    	Page<Note> notes =  noteRepository.findByUserId(userId, pageable);
    	
        return notes.getContent().size();
    }
    
    @GetMapping("/notes/{userId}")
    public Page<Note> getAllNotesByUserId(@PathVariable (value = "userId") Long userId,
                                                Pageable pageable) {
        return noteRepository.findByUserId(userId, pageable);
    }
    
    @GetMapping("/notes/{userId}/note/{noteId}")
    public Optional<Note> getANoteByUserId(@PathVariable (value = "userId") Long userId,
    											@PathVariable (value = "noteId") Long noteId,
                                                Pageable pageable) {
    	return noteRepository.findByIdAndUserId(noteId, userId);
        //return noteRepository.findByUserId(userId, pageable);
    }
    
    @PostMapping("/notes/{userId}")
    public Note createNote(@PathVariable (value = "userId") Long userId,
                                 @Valid @RequestBody Note note) {
        return userRepository.findById(userId).map(user -> {
            note.setUser(user);
            return noteRepository.save(note);
        }).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
    }
    
    @PutMapping("/notes/{userId}/note/{noteId}")
    public Note updateNote(@PathVariable (value = "userId") Long userId,
                                 @PathVariable (value = "noteId") Long noteId,
                                 @Valid @RequestBody Note noteRequest) {
        if(!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User", "id", userId);
        }

        return noteRepository.findById(noteId).map(note -> {
            note.setTitle(noteRequest.getTitle());
            note.setContent(noteRequest.getContent());
            return noteRepository.save(note);
        }).orElseThrow(() -> new ResourceNotFoundException("Note ", "id", noteId));
    }
    
    @DeleteMapping("/notes/{userId}/note/{noteId}")
    public ResponseEntity<?> deleteNote(@PathVariable (value = "userId") Long userId,
                              @PathVariable (value = "noteId") Long noteId) {
        return noteRepository.findByIdAndUserId(noteId, userId).map(note -> {
            noteRepository.delete(note);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("Note ", "Note id", noteId));
    }
}
