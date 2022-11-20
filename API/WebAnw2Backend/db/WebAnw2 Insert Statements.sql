-- ------------------------------
-- DB Modell zu WebAnwendungen 2, Version 3.0
-- Insert Statements

-- ------------------------------
-- Komponist
INSERT INTO Komponist (name) VALUES ('Jon Bovi');
INSERT INTO Komponist (name) VALUES ('Fäaschtbänkler');
INSERT INTO Komponist (name) VALUES ('José Feliciano');
INSERT INTO Komponist (name) VALUES ('Richard Wagner');
INSERT INTO Komponist (name) VALUES ('Udo Jürgens');
INSERT INTO Komponist (name) VALUES ('Methodej Prajka');
INSERT INTO Komponist (name) VALUES ('Carloe King');
INSERT INTO Komponist (name) VALUES ('J.Lennon, P.MCCartney');
INSERT INTO Komponist (name) VALUES ('Ulrich Swillims');

-- Bearbeiter
INSERT INTO Bearbeiter (name) VALUES ('Wolfgang Wössner');
INSERT INTO Bearbeiter (name) VALUES ('Roman Würthrich');
INSERT INTO Bearbeiter (name) VALUES ('Heinz Briegel');
INSERT INTO Bearbeiter (name) VALUES ('R. Seifert-Kressbronn');
INSERT INTO Bearbeiter (name) VALUES ('Erwin Jahreis');
INSERT INTO Bearbeiter (name) VALUES ('Siegfried Rundel');
INSERT INTO Bearbeiter (name) VALUES ('Jörg Bollin');
INSERT INTO Bearbeiter (name) VALUES ('Manfred Schneider');

-- Verlag
INSERT INTO Verlag (name) VALUES ('Karl Bogner');
INSERT INTO Verlag (name) VALUES ('Ewoton');
INSERT INTO Verlag (name) VALUES ('Rudel');
INSERT INTO Verlag (name) VALUES ('KLARUS');
INSERT INTO Verlag (name) VALUES ('Xtina Music');
INSERT INTO Verlag (name) VALUES ('Bernhard Geiger');
INSERT INTO Verlag (name) VALUES ('Scherbach');
INSERT INTO Verlag (name) VALUES ('Ernst Mosch');
INSERT INTO Verlag (name) VALUES ('Helma');
INSERT INTO Verlag (name) VALUES ('Adler');
INSERT INTO Verlag (name) VALUES ('Sony');
INSERT INTO Verlag (name) VALUES ('Studio-Verlag R.Seifert');

-- Lied
-- nochmal nachschauen mit mehreren Fremdschlüsseln!
INSERT INTO Lied (titel, komponist_id, bearbeiter_id, verlag_id) 
    VALUES('Bon Jovi-Rock Mix', 
        (SELECT komponist_id FROM Komponist WHERE Komponist.name = 'Jon Bon Jovi'),
        (SELECT bearbeiter_id FROM Bearbeiter WHERE Bearbeiter.name = 'Wolfgang Wössner'),
        (SELECT verlag_id FROM Komponist WHERE verlag.name = ''));
INSERT INTO Lied (titel, komponist_id, bearbeiter_id, verlag_id) 
    VALUES('CAN YOU ENGLISH PLEASE', 
        (SELECT komponist_id FROM Komponist WHERE Komponist.name = 'Fäaschtbänkler'),
        (SELECT bearbeiter_id FROM Bearbeiter WHERE Bearbeiter.name = 'Roman Würthrich'),
        (SELECT verlag_id FROM Komponist WHERE verlag.name = ''));
INSERT INTO Lied (titel, komponist_id, bearbeiter_id, verlag_id) 
    VALUES('Felize Navidad', 
        (SELECT komponist_id FROM Komponist WHERE Komponist.name = 'José Feliciano'),
        (SELECT bearbeiter_id FROM Bearbeiter WHERE Bearbeiter.name = 'Heinz Briegel'),
        (SELECT verlag_id FROM Komponist WHERE verlag.name = 'Rundel'));
INSERT INTO Lied (titel, komponist_id, bearbeiter_id, verlag_id) 
    VALUES('Festmusik', 
        (SELECT komponist_id FROM Komponist WHERE Komponist.name = 'Richard Wagner'),
        (SELECT bearbeiter_id FROM Bearbeiter WHERE Bearbeiter.name = 'R. Seifert-Kressbronn'),
        (SELECT verlag_id FROM Komponist WHERE verlag.name = 'Studio-Verlag R.Seifert'));
INSERT INTO Lied (titel, komponist_id, bearbeiter_id, verlag_id) 
    VALUES('Griechischer Wein', 
        (SELECT komponist_id FROM Komponist WHERE Komponist.name = 'Udo Jürgens'),
        (SELECT bearbeiter_id FROM Bearbeiter WHERE Bearbeiter.name = 'Erwin Jahreis'),
        (SELECT verlag_id FROM Komponist WHERE verlag.name = 'Bernhard Geiger'));
INSERT INTO Lied (titel, komponist_id, bearbeiter_id, verlag_id) 
    VALUES('Polka Nr.37', 
        (SELECT komponist_id FROM Komponist WHERE Komponist.name = 'Methodej Prajka'),
        (SELECT bearbeiter_id FROM Bearbeiter WHERE Bearbeiter.name = 'Siegfried Rundel'),
        (SELECT verlag_id FROM Komponist WHERE verlag.name = 'Rundel'));
INSERT INTO Lied (titel, komponist_id, bearbeiter_id, verlag_id) 
    VALUES('Hard Rock Cafe', 
        (SELECT komponist_id FROM Komponist WHERE Komponist.name = 'Carole King'),
        (SELECT bearbeiter_id FROM Bearbeiter WHERE Bearbeiter.name = 'Erwin Jahreis'),
        (SELECT verlag_id FROM Komponist WHERE verlag.name = 'Bernhard Geiger'));
INSERT INTO Lied (titel, komponist_id, bearbeiter_id, verlag_id) 
    VALUES('Hey Jude', 
        (SELECT komponist_id FROM Komponist WHERE Komponist.name = 'J.Lennon, P.MCCartney'),
        (SELECT bearbeiter_id FROM Bearbeiter WHERE Bearbeiter.name = 'Jörg Bollin'),
        (SELECT verlag_id FROM Komponist WHERE verlag.name = 'Sony'));
INSERT INTO Lied (titel, komponist_id, bearbeiter_id, verlag_id) 
    VALUES('Über sieben Brücken', 
        (SELECT komponist_id FROM Komponist WHERE Komponist.name = 'Ulrich Swillims'),
        (SELECT bearbeiter_id FROM Bearbeiter WHERE Bearbeiter.name = 'Manfred Schneider'),
        (SELECT verlag_id FROM Komponist WHERE verlag.name = 'Rundel'));





