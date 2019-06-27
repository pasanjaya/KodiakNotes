package com.example.kodiakNotes.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.kodiakNotes.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
