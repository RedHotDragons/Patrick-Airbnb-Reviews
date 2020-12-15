DROP DATABASE IF EXISTS Reviews;

CREATE DATABASE Reviews;


CREATE TABLE IF NOT EXISTS listing (
  listing_id SERIAL NOT NULL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS review (
  -- id SERIAL PRIMARY KEY,
  listing_id SERIAL PRIMARY KEY REFERENCES Listing,
  "date" varchar(50),
  reviewer_name varchar(60) NOT NULL,
  reviewer_picture varchar(255) NOT NULL,
  comments varchar(2000) NOT NULL,
  cleanliness INTEGER NOT NULL,
  communication INTEGER NOT NULL,
  check_in INTEGER NOT NULL,
  accuracy INTEGER NOT NULL,
  location INTEGER NOT NULL,
  value INTEGER NOT NULL
);