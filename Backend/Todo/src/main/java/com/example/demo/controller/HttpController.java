package com.example.demo.controller;

import java.lang.module.ResolutionException;
import java.lang.reflect.Field;
import java.sql.Ref;
import java.sql.SQLOutput;
import java.util.*;
import java.util.concurrent.Delayed;

import org.apache.el.util.ReflectionUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Todo;
import com.example.demo.model.todoRepo;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class HttpController {
	
	private todoRepo repo;
	private static final Logger logger = LoggerFactory.getLogger(HttpController.class);
	public HttpController(todoRepo repo) {
		this.repo = repo;
	}
	
	@GetMapping("/todos")
	public ResponseEntity<?> getTodo(){
		List<Todo> todo = repo.findAll();

		if(todo.isEmpty())
			return new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK);
		else {

			return new ResponseEntity<>(todo, HttpStatus.OK);
		}
		
	}
	
	@PostMapping("/new")
	public ResponseEntity<Todo> addTodo(@RequestBody Todo todo)
	{
		Todo savedTodo = repo.save(todo);
		return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/todo/del/{id}")
	public ResponseEntity<?> removeTodo(@PathVariable Integer id){
		
		Optional<Todo> todo = repo.findById(id);
		if(todo.isEmpty()) {
			throw new ResourceNotFoundException("Todo with "+id+" not found");
		}else {
			repo.deleteById(id);
			return new ResponseEntity<>(Collections.singletonMap("message", "Todo Deleted"), HttpStatus.OK);
		}
	 }


	@PatchMapping("/todo/edit/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable Integer id, @RequestBody Map<String, Object> fields){

		Optional<Todo> existingTodo = repo.findById(id);
		if(existingTodo.isEmpty())
			throw new ResourceNotFoundException("Not Founded");
		else {
			fields.forEach((key, value) -> {
				Field field = ReflectionUtils.findField(Todo.class, key);
				assert field != null;
				field.setAccessible(true);
				ReflectionUtils.setField(field, existingTodo.get(), value);
				repo.save(existingTodo.get());
			});
			return new ResponseEntity<>(existingTodo.get(), HttpStatus.OK);
		}


	}

	
	

}
