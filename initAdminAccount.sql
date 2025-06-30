INSERT INTO users (user_id, username, password, email, phone, user_role, createdAt, updatedAt)
VALUES (
    UUID(),
    'admin',
    '$2b$12$dfnX.xeeW8kKkBVhI6FCWuU0qS/mdDYGxNBHmTIsnIebcH4lYOKMS',
    'admin@gmail.com',
    '038038038', 
    'admin',
    NOW(),
    NOW()
);