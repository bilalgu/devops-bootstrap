CREATE TABLE articles (
	id SERIAL PRIMARY KEY,
	title TEXT NOT NULL,
	author TEXT NOT NULL
);

INSERT INTO articles (title, author)
VALUES
    ('Hello DevOps', 'Bilal'),
    ('Life is Gooooood !', 'Lalbi');