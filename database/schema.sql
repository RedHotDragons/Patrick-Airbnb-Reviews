DROP DATABASE IF EXISTS Reviews;

CREATE DATABASE Reviews;

USE Reviews;

CREATE TABLE Review (
  id integer NOT NULL SERIAL,
  listing_id integer NOT NULL SERIAL REFERENCE Listing,
  date date,
  reviewer_name varchar(60) NOT NULL,
  reviewer_picture varchar(255) NOT NULL,
  comments varchar(255) NOT NULL,
  cleanliness float(1) NOT NULL,
  communication float(1) NOT NULL,
  check_in float(1) NOT NULL,
  accuracy float(1) NOT NULL,
  location float(1) NOT NULL,
  value float(1) NOT NULL,
  PRIMARY KEY(ID),
);


CREATE TABLE Listing (
  listing_id integer NOT NULL SERIAL,
  PRIMARY KEY(listing_id)
)