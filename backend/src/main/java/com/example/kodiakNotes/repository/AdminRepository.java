package com.example.kodiakNotes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.kodiakNotes.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long>  {

}
