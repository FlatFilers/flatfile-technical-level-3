-- Insert boards
INSERT INTO board (id, title) VALUES (1, "Trello");

-- Insert sections
INSERT INTO sections(title) VALUES ('Backlog');
INSERT INTO sections(title) VALUES ('Ready for Development');
INSERT INTO sections(title) VALUES ('In Progress');
INSERT INTO sections(title) VALUES ('In Review');
INSERT INTO sections(title) VALUES ('Done');

-- Insert cards
INSERT INTO cards(title, section_id, board_id) VALUES ('Card drag/drop', (SELECT id FROM sections WHERE title='Backlog'), 1);
INSERT INTO cards(title, section_id, board_id) VALUES ('Card details', (SELECT id FROM sections WHERE title='Backlog'), 1);
INSERT INTO cards(title, section_id, board_id) VALUES ('Multiple boards', (SELECT id FROM sections WHERE title='Backlog'), 1);