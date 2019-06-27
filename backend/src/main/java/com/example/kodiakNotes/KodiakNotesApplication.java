package com.example.kodiakNotes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.example.kodiakNotes.controller.NoteController;

@SpringBootApplication
@EnableJpaAuditing
public class KodiakNotesApplication {

	public static void main(String[] args) {
		SpringApplication.run(KodiakNotesApplication.class, args);
	}

}
