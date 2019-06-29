package com.example.kodiakNotes.model;

public class FeedbackData {
	private long feedbackId;
	private String feedback;
	private String userEmail;
	
	public FeedbackData(long feedbackId, String feedback, String userEmail) {
		super();
		this.feedbackId = feedbackId;
		this.feedback = feedback;
		this.userEmail = userEmail;
	}

	public long getFeedbackId() {
		return feedbackId;
	}

	public void setFeedbackId(long feedbackId) {
		this.feedbackId = feedbackId;
	}

	public String getFeedback() {
		return feedback;
	}

	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	
	
	
}
