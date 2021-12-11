CREATE TABLE sections (
    id serial PRIMARY KEY,
    title text NOT NULL
);

CREATE TABLE cards (
    id serial PRIMARY KEY,
    title text NOT NULL,
    section_id serial,
    board_id serial
);

CREATE TABLE boards (
    id serial PRIMARY KEY,
    title text NOT NULL UNIQUE
);