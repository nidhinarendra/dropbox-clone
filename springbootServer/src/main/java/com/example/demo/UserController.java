package com.example.demo;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.User.Files;

@RestController
@RequestMapping("/api/users")
public class UserController {
private UserRepository userRepository;

public UserController(UserRepository userRepository) {
	super();
	this.userRepository = userRepository;
}

@GetMapping("/all")
public Iterable<User> getAll(){
	Iterable<User> users = this.userRepository.findAll();
	return users;
}

@GetMapping("/{id}")
public User findById(@PathVariable("id") String id) {
	User user = this.userRepository.findById(id);
	return user;
}

public class userLogin{
	String email;
	String password;
}

public class responseLogin{
	public responseLogin(String firstName, String lastName, String id, String statusCode) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.id = id;
		this.statusCode = statusCode;
		// TODO Auto-generated constructor stub
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}
	String firstName;
	String lastName;
	String id;
	String statusCode;
}

@PostMapping(value = "/logout")
@ResponseStatus(HttpStatus.NO_CONTENT)
public ResponseEntity<?> logout(HttpSession session) {
    System.out.println(session.getAttribute("name"));
    session.invalidate();
    return  new ResponseEntity(HttpStatus.OK);
}

@PostMapping(path="/authenticate",consumes = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<?> login(@RequestBody String payload, HttpSession session)
{
	String email = new String();
	String password = new String();
    JSONObject jsonObject;
	try {
		jsonObject = new JSONObject(payload);
		System.out.println("The payload in the user authentication is: ");
		System.out.println(payload);
		System.out.println("it is converted to a json object: ");
		System.out.println(jsonObject);
	    session.setAttribute("name",jsonObject.getString("email"));
	   email =  jsonObject.getString("email");
	  password =jsonObject.getString("password");

	} catch (JSONException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	User user = this.userRepository.findByEmailAndPassword(email, password);
	System.out.println(user.getFirstName());
	responseLogin response = new responseLogin(user.getFirstName(), user.getLastName(), user.getId(), "200");
	System.out.println(response);
    return new ResponseEntity(response,HttpStatus.OK);
}


@PostMapping(path="/register",consumes = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<?> register(@RequestBody String payload, HttpSession session)
{
	String email = new String();
	String password = new String();
	String firstName = new String();
	String lastName = new String();
    JSONObject jsonObject;
	try {
		jsonObject = new JSONObject(payload);
		System.out.println("The payload in the user registration is: ");
		System.out.println(payload);
		System.out.println("it is converted to a json object: ");
		System.out.println(jsonObject);
		
//	    session.setAttribute("name",jsonObject.getString("email"));
	  email =  jsonObject.getString("email");
	  password = jsonObject.getString("password");
	  firstName = jsonObject.getString("firstName");
	  lastName = jsonObject.getString("lastName");

	} catch (JSONException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
	User user = new User();
	user.setEmail(email);
	user.setFirstName(firstName);
	user.setLastName(lastName);
	user.setPassword(password);
	System.out.println(user);
	this.userRepository.save(user);
	return new ResponseEntity(HttpStatus.OK);

}

@PostMapping(path="/updateStarFile",consumes = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<?> starFile(@RequestBody String payload, HttpSession session)
{
	String id = new String();
	String file = new String();
	Boolean star = new Boolean(false);
    JSONObject jsonObject;
	try {
		jsonObject = new JSONObject(payload);
		System.out.println("The payload in the user star file is: ");
		System.out.println(payload);
		System.out.println("it is converted to a json object: ");
		System.out.println(jsonObject);
		
//	    session.setAttribute("name",jsonObject.getString("email"));
		id =  jsonObject.getString("userid");
		file = jsonObject.getString("file");
		star = jsonObject.getBoolean("star");

	} catch (JSONException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
//	mongoOps.updateFirst(query(where("name").is("Joe")), update("age", 35), Person.class);  
	User user = this.userRepository.findById(id);
	List<User.Files> myFiles = user.getFiles();
	System.out.println(myFiles);
	for(User.Files f:myFiles) {
		if(f.filename.equals(file)) {
			f.setStar(true);
			this.userRepository.save(user);
		}
	}
    return new ResponseEntity(HttpStatus.OK);
}

@PostMapping(path="/updateStarFolder",consumes = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<?> starFolder(@RequestBody String payload, HttpSession session)
{
	String id = new String();
	String folder = new String();
	Boolean star = new Boolean(false);
    JSONObject jsonObject;
	try {
		jsonObject = new JSONObject(payload);
		System.out.println("The payload in the user star Folder is: ");
		System.out.println(payload);
		System.out.println("it is converted to a json object: ");
		System.out.println(jsonObject);
		
		id =  jsonObject.getString("userid");
		folder = jsonObject.getString("folder");
		star = jsonObject.getBoolean("star");

	} catch (JSONException e) {
		e.printStackTrace();
	}
	
	User user = this.userRepository.findById(id);
	List<User.Folders> myFolders = user.getFolders();
	System.out.println(myFolders);
	for(User.Folders f:myFolders) {
		if(f.foldername.equals(folder)) {
			f.setStar(true);
			this.userRepository.save(user);
		}
	}
    return new ResponseEntity(HttpStatus.OK);
}


@GetMapping("/getFiles/{id}")
public List<User.Files> getAllFiles(@PathVariable("id") String id) {
	User user = this.userRepository.findById(id);

	List<User.Files> arrayOfFiles = user.getFiles();
	return arrayOfFiles;
}

@GetMapping("/getRecentFiles/{id}")
public List<User.Files> getRecentFiles(@PathVariable("id") String id) {
	User user = this.userRepository.findById(id);
	List<User.Files> arrayOfFiles = user.getFiles();
	return arrayOfFiles;
}

@GetMapping("/starredFiles/{id}")
public List<User.Files> getStarredFiles(@PathVariable("id") String id) {
	User user = this.userRepository.findById(id);
	List<User.Files> arrayOfFiles = user.getFiles();
	return arrayOfFiles;
}

@GetMapping("/starredFolders/{id}")
public List<User.Folders> getStarredFolde(@PathVariable("id") String id) {
	User user = this.userRepository.findById(id);
	List<User.Folders> arrayOfFolders = user.getFolders();
	System.out.println(arrayOfFolders.size());
	Iterator iter = arrayOfFolders.iterator();
	Object first = iter.next();
	System.out.println(first);

//	for (int i=0; i< arrayOfFiles.size(); i++) {
//		if(arrayOfFiles)
//	}
	return arrayOfFolders;
}




@GetMapping("/getFolders/{id}")
public List<User.Folders> getAllFolderBy(@PathVariable("id") String id){
	User user = this.userRepository.findById(id);
	List<User.Folders> arrayOfFolders = user.getFolders();
	
	return arrayOfFolders;
}

}
