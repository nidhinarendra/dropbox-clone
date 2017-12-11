package com.example.demo;

import java.util.List;
import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="users")
public class User {
	@Id
	private String id;
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private List<Folders> folders;
	private List<Files> files;

	public class Files {
		public String filename;
		public String getFilename() {
			return filename;
		}
		public void setFilename(String filename) {
			this.filename = filename;
		}
		public String getFilepath() {
			return filepath;
		}
		public void setFilepath(String filepath) {
			this.filepath = filepath;
		}
		public Boolean getStar() {
			return star;
		}
		public void setStar(Boolean star) {
			this.star = star;
		}
		public String filepath;
		public Boolean star;
	}
	
	public class Folders {
		public String foldername;
		public String folderpath;
		
		public String getFoldername() {
			return foldername;
		}
		public void setFoldername(String foldername) {
			this.foldername = foldername;
		}
		public String getFolderpath() {
			return folderpath;
		}
		public void setFolderpath(String folderpath) {
			this.folderpath = folderpath;
		}
		public Boolean getStar() {
			return star;
		}
		public void setStar(Boolean star) {
			this.star = star;
		}
		Boolean star;
	}
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public List<Folders> getFolders() {
		return folders;
	}
	public List<Files> getFiles() {
		return files;
	}
	public void setFolders(List<Folders> folders) {
		this.folders = folders;
	}
	
	
}
