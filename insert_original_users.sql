USE cvrgu_erp;

INSERT IGNORE INTO users (name, email, password, role, banned) VALUES
('Admin User',          'admin@cgu.ac.in',           'Admin@123',   'admin',   0),
('STHITA PRAJNA BISWAL','sthitasamu730@gmail.com',    'Admin@123',   'admin',   0),
('Anwesha Majhi',       'riya@gmail.com',             'Student@123', 'student', 0),
('Anwesha Majhi',       'riyaa@gmail.com',            'Admin@123',   'admin',   0),
('Anwesha Majhi',       'anu@gmail.com',              'Faculty@123', 'faculty', 0),
('Riya',                'riyaaa@gmail.com',           'Student@123', 'student', 0),
('Sthita',              'samm@gmail.in',              'Student@123', 'student', 0);
