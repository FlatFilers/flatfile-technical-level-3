-- Insert sections
INSERT INTO sections(title) VALUES ('Backlog');
INSERT INTO sections(title) VALUES ('Ready for Development');
INSERT INTO sections(title) VALUES ('In Progress');
INSERT INTO sections(title) VALUES ('In Review');
INSERT INTO sections(title) VALUES ('Done');

-- Insert boards
INSERT INTO boards(title) VALUES ('Board 1');
INSERT INTO boards(title) VALUES ('Board 2');
INSERT INTO boards(title) VALUES ('Board 3');

-- Insert cards
INSERT INTO cards(title, board_id, section_id) VALUES ('Card drag/drop', (SELECT id FROM boards WHERE title='Board 1'), (SELECT id FROM sections WHERE title='Backlog'));
INSERT INTO cards(title, board_id, section_id) VALUES ('Card details', (SELECT id FROM boards WHERE title='Board 2'), (SELECT id FROM sections WHERE title='Backlog'));
INSERT INTO cards(title, board_id, section_id) VALUES ('Multiple boards', (SELECT id FROM boards WHERE title='Board 3'), (SELECT id FROM sections WHERE title='Backlog'));