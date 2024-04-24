package com.example.demo.exception;

import java.time.LocalDateTime;
import java.util.Date;

public class ErrorMessage {
	private int statusCode;
	private String msg;
	private LocalDateTime timestamp;
	public ErrorMessage(int statusCode, String msg, LocalDateTime timestamp) {
		super();
		this.statusCode = statusCode;
		this.msg = msg;
		this.timestamp = timestamp;
	}
	public int getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public LocalDateTime getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}
	
	
	

}
