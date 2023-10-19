CREATE TABLE sections (
    id serial PRIMARY KEY,
    title text NOT NULL
);

CREATE TABLE cards (
    id serial PRIMARY KEY,
    title text NOT NULL,
    description TEXT,
    section_id serial, 
    image1 TEXT, 
    image2 TEXT, 
    image3 TEXT
);