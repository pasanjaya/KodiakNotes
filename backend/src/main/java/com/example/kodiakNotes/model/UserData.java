package com.example.kodiakNotes.model;

import org.springframework.stereotype.Component;

public class UserData {
	long userId;
	String email;
	
	public UserData(long userId, String email) {
		super();
		this.userId = userId;
		this.email = email;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	
}
