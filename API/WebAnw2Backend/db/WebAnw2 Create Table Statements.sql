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
	titel TEXT NOT NULL,
	komponist_id INTEGER, 
	bearbeiter_id INTEGER, 
	verlag_id INTEGER, 
	FOREIGN KEY (komponist_id) REFERENCES Komponist(id),
	FOREIGN KEY (bearbeiter_id) REFERENCES Bearbeiter(id),
	FOREIGN KEY (verlag_id) REFERENCES Verlag(id)
);

-- Anschrift
CREATE TABLE Anschrift (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	straße TEXT NOT NULL,
	hausnr text NOT NULL,
	plz text NOT NULL,
	ort text NOT NULL
);

-- Verein
CREATE TABLE Verein (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	name text NOT NULL,
	musikleitervorname text,
	musikleiternachname text, 
	anschrift_id INTEGER, 
	anzahlMusiker INTEGER,
	besetzung text,
	mitgliedsnr text,
	FOREIGN KEY (anschrift_id) REFERENCES Anschrift(id)
);

-- Veranstaltung
CREATE TABLE Veranstaltung (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	veranstalter text NOT NULL,
	anschrift_id INTEGER, 
	art text,
	datum text,
	anfangsuhrzeit text,
	enduhrzeit text,
	FOREIGN KEY (anschrift_id) REFERENCES Anschrift(id)
);

-- Musikfolge
CREATE TABLE Musikfolge (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	vereins_id INTEGER,
	veranstaltungs_id INTEGER, 
	FOREIGN KEY (vereins_id) REFERENCES Verein(id),
	FOREIGN KEY (veranstaltungs_id) REFERENCES Veranstaltung(id)
);

-- FolgeLied
CREATE TABLE FolgeLied (
	musikfolge_id INTEGER, 
	lied_id INTEGER,
	FOREIGN KEY (musikfolge_id) REFERENCES Musikfolge(id),
	FOREIGN KEY (lied_id) REFERENCES Lied(id)
);
