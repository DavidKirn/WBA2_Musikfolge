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
        (SELECT id FROM Komponist WHERE Komponist.name = 'Jon Bon Jovi'),
        (SELECT id FROM Bearbeiter WHERE Bearbeiter.name = 'Wolfgang Wössner'),
        (SELECT id FROM Verlag WHERE Verlag.name = ''));
INSERT INTO Lied (titel, komponist_id, bearbeiter_id, verlag_id) 
    VALUES('CAN YOU ENGLISH PLEASE', 
        (SELECT id FROM Komponist WHERE Komponist.name = 'Fäaschtbänkler'),
        (SELECT id FROM Bearbeiter WHERE Bearbeiter.name = 'Roman Würthrich'),
        (SELECT id FROM Verlag WHERE Verlag.name = ''));
INSERT INTO Lied (titel, komponist_id, bearbeiter_id, verlag_id) 
    VALUES('Felize Navidad', 
        (SELECT id FROM Komponist WHERE Komponist.name = 'José Feliciano'),
        (SELECT id FROM Bearbeiter WHERE Bearbeiter.name = 'Heinz Briegel'),
        (SELECT id FROM Verlag WHERE Verlag.name = 'Rundel'));
INSERT INTO Lied (titel, komponist_id, bearbeiter_id, verlag_id) 
    VALUES('Festmusik', 
        (SELECT id FROM Komponist WHERE Komponist.name = 'Richard Wagner'),
        (SELECT id FROM Bearbeiter WHERE Bearbeiter.name = 'R. Seifert-Kressbronn'),
        (SELECT id FROM Verlag WHERE Verlag.name = 'Studio-Verlag R.Seifert'));
INSERT INTO Lied (titel, komponist_id, bearbeiter_id, verlag_id) 
    VALUES('Griechischer Wein', 
        (SELECT id FROM Komponist WHERE Komponist.name = 'Udo Jürgens'),
        (SELECT id FROM Bearbeiter WHERE Bearbeiter.name = 'Erwin Jahreis'),
        (SELECT id FROM Verlag WHERE Verlag.name = 'Bernhard Geiger'));
INSERT INTO Lied (titel, komponist_id, bearbeiter_id, verlag_id) 
    VALUES('Polka Nr.37', 
        (SELECT id FROM Komponist WHERE Komponist.name = 'Methodej Prajka'),
        (SELECT id FROM Bearbeiter WHERE Bearbeiter.name = 'Siegfried Rundel'),
        (SELECT id FROM Verlag WHERE Verlag.name = 'Rundel'));
INSERT INTO Lied (titel, komponist_id, bearbeiter_id, verlag_id) 
    VALUES('Hard Rock Cafe', 
        (SELECT id FROM Komponist WHERE Komponist.name = 'Carole King'),
        (SELECT id FROM Bearbeiter WHERE Bearbeiter.name = 'Erwin Jahreis'),
        (SELECT id FROM Verlag WHERE Verlag.name = 'Bernhard Geiger'));
INSERT INTO Lied (titel, komponist_id, bearbeiter_id, verlag_id) 
    VALUES('Hey Jude', 
        (SELECT id FROM Komponist WHERE Komponist.name = 'J.Lennon, P.MCCartney'),
        (SELECT id FROM Bearbeiter WHERE Bearbeiter.name = 'Jörg Bollin'),
        (SELECT id FROM Verlag WHERE Verlag.name = 'Sony'));
INSERT INTO Lied (titel, komponist_id, bearbeiter_id, verlag_id) 
    VALUES('Über sieben Brücken', 
        (SELECT id FROM Komponist WHERE Komponist.name = 'Ulrich Swillims'),
        (SELECT id FROM Bearbeiter WHERE Bearbeiter.name = 'Manfred Schneider'),
        (SELECT id FROM Verlag WHERE Verlag.name = 'Rundel'));

-- Anschrift
INSERT INTO Anschrift (straße, hausnr, plz, ort)
    VALUES ('Musterstraße', '1', '12345', 'Musterhausen');
INSERT INTO Anschrift (straße, hausnr, plz, ort)
    VALUES ('Musterweg', '2', '98765', 'Musterstadt');
INSERT INTO Anschrift (straße, hausnr, plz, ort)
    VALUES ('Mustereck', '3', '13580', 'Musterort');

--Verein
INSERT INTO Verein (name, musikleitervorname,musikleiternachname, anschrift_id, anzahlMusiker, besetzung, mitgliedsnr)
    VALUES('Musterverein', 'Reiner', 'Zufall', 
    (SELECT id FROM Anschrift WHERE Anschrift.straße = 'Musterstraße' and Anschrift.hausnr = '1' and Anschrift.plz = '12345' and Anschrift.ort = 'Musterhausen'),
    15, 'Musterbesetzung', '1234'
    );
INSERT INTO Verein (name, musikleitervorname,musikleiternachname, anschrift_id, anzahlMusiker, besetzung, mitgliedsnr)
    VALUES('Musterclub', 'Max', 'Mustermann', 
    (SELECT id FROM Anschrift WHERE Anschrift.straße = 'Musterweg' and Anschrift.hausnr = '2' and Anschrift.plz = '98765' and Anschrift.ort = 'Musterstadt'),
    20, 'Musterbesetzung', '3456'
    );

-- Veranstaltung
INSERT INTO Veranstaltung (veranstalter, anschrift_id, art, datum, anfangsuhrzeit, enduhrzeit)
    VALUES('Musterveranstalter', 
    (SELECT id FROM Anschrift WHERE Anschrift.straße = 'Musterstraße' and Anschrift.hausnr = '1' and Anschrift.plz = '12345' and Anschrift.ort = 'Musterhausen'),
    'Frühshoppen', '01.01.2023', '10:00', '11:00'
    );

-- Musikfolge
INSERT INTO Musikfolge (vereins_id, veranstaltungs_id)
    VALUES( 
    (SELECT id FROM Verein WHERE Verein.name = 'Musterverein' and Verein.musikleitervorname = 'Reiner' and Verein.musikleiternachname = 'Zufall' and Verein.anzahlMusiker = 15 and Verein.besetzung = 'Musterbesetzung' and Verein.mitgliedsnr = '1234'),
    (SELECT id FROM Veranstaltung WHERE Veranstaltung.veranstalter = 'Musterveranstalter' and Veranstaltung.art = 'Frühshoppen' and Veranstaltung.datum = '01.01.2023' and Veranstaltung.anfangsuhrzeit = '10:00' and Veranstaltung.enduhrzeit = '11:00')
    );


