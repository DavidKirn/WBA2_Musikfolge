-- ------------------------------
-- DB Modell zu WebAnwendungen 2, Version 3.0
-- Create Table Statements

-- ------------------------------
-- DB erstellen
Create DATABASE Musikfolge; 
USE Musikfolge; 

-- Komponist
CREATE TABLE Komponist (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL
);

-- Bearbeiter
CREATE TABLE Bearbeiter (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL
);

-- Verlag
CREATE TABLE Verlag (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL
);

-- Lied
CREATE TABLE Lied (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	titel TEXT NOT NULL
	FOREIGN KEY (komponist_id) REFERENCES Komponist(id)
	FOREIGN KEY (bearbeiter_id) REFERENCES Bearbeiter(id)
	FOREIGN KEY (verlag_id) REFERENCES Verlag(id)
);
