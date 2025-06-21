-- Insert Users
INSERT INTO Users (username, email, password_hash, role)
VALUES 
('alice123', 'alice@example.com', 'hashed123', 'owner'),
('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
('carol123', 'carol@example.com', 'hashed789', 'owner'),
('david_dog_lover', 'david@example.com', 'hashed101', 'owner'),
('emma_walks', 'emma@example.com', 'hashed202', 'walker');

-- Insert Dogs using subqueries to get owner_id
INSERT INTO Dogs (owner_id, name, size)
VALUES 
((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small'),
((SELECT user_id FROM Users WHERE username = 'alice123'), 'Charlie', 'large'),
((SELECT user_id FROM Users WHERE username = 'david_dog_lover'), 'Luna', 'small'),
((SELECT user_id FROM Users WHERE username = 'carol123'), 'Cooper', 'medium');

-- Insert Walk Requests using subqueries to get dog_id
INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
VALUES 
((SELECT dog_id FROM Dogs WHERE name = 'Max' AND owner_id = (SELECT user_id FROM Users WHERE username = 'alice123')), 
 '2025-06-10 08:00:00', 30, 'Parklands', 'open'),
 
((SELECT dog_id FROM Dogs WHERE name = 'Bella' AND owner_id = (SELECT user_id FROM Users WHERE username = 'carol123')), 
 '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted'),
 
((SELECT dog_id FROM Dogs WHERE name = 'Charlie' AND owner_id = (SELECT user_id FROM Users WHERE username = 'alice123')), 
 '2025-06-11 14:00:00', 60, 'Central Park', 'open'),
 
((SELECT dog_id FROM Dogs WHERE name = 'Luna' AND owner_id = (SELECT user_id FROM Users WHERE username = 'david_dog_lover')), 
 '2025-06-12 16:30:00', 40, 'River Walk', 'completed'),
 
((SELECT dog_id FROM Dogs WHERE name = 'Cooper' AND owner_id = (SELECT user_id FROM Users WHERE username = 'carol123')), 
 '2025-06-13 10:15:00', 50, 'Mountain Trail', 'cancelled');
