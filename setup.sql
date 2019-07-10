-- CSE 154
-- Nadir Tareen
-- Section: AJ
-- May 31st, 2019
-- This is the setup sql file for my database

CREATE TABLE TravelLog
	(id int NOT NULL AUTO_INCREMENT,
	 place varchar(40) NOT NULL,
	 country varchar(40) NOT NULL,
	 visited int NOT NULL,
   date varchar(10),
   interests text,
   PRIMARY KEY(id));

INSERT INTO TravelLog (place, country, visited, date, interests)
VALUES ('DisneyLand, CA', 'USA', 1, 'Jun 2005', 'Fear Factor Ride');

INSERT INTO TravelLog (place, country, visited, date, interests)
VALUES ('Koala Lumpur', 'Malaysia', 1, 'Jun 2006', 'Twin Towers');

INSERT INTO TravelLog (place, country, visited, date, interests)
VALUES ('Langkawi', 'Malaysia', 1, 'Jun 2006', 'Scuba Diving');

INSERT INTO TravelLog (place, country, visited, date, interests)
VALUES ('Istanbul', 'Turkey', 1, 'Jun 2007', 'Blue Mosque, Hagia Sophia, Amazing Food', 'Topkapi');

INSERT INTO TravelLog (place, country, visited, date, interests)
VALUES ('Antalya', 'Turkey', 1, 'Jun 2007', 'The Beach');

INSERT INTO TravelLog (place, country, visited, date, interests)
VALUES ('Kota Kina Balu', 'Malaysia', 1, 'Jun 2008', 'Its a mountain!');

INSERT INTO TravelLog (place, country, visited, date, interests)
VALUES ('Dubai', 'UAE', 1, 'Jun 2012', 'Ferrari World, Atlantis Water Park, Dubai Mall');

INSERT INTO TravelLog (place, country, visited, date, interests)
VALUES ('Las Vegas', 'USA', 1, 'Jun 2015', 'The Giant Wheel Thing');
