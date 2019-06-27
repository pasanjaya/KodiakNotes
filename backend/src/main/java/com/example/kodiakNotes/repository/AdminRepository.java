package com.example.kodiakNotes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.kodiakNotes.model.Admin;
import com.example.kodiakNotes.model.Note;

public interface AdminRepository extends JpaRepository<Admin, Long>  {

}
