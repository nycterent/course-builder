-- Course Builder Database Initialization
-- This file sets up the basic database structure for Course Builder

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS coursebuilder;
USE coursebuilder;

-- Basic user setup
-- The actual schema will be created by Drizzle migrations

-- Set proper permissions
GRANT ALL PRIVILEGES ON coursebuilder.* TO 'coursebuilder'@'%';
FLUSH PRIVILEGES;

-- Create a default admin user (this would normally be done through the app)
-- This is just for initial setup
INSERT INTO users (id, email, name, createdAt, updatedAt) 
VALUES (
  'admin-user-id', 
  'admin@coursebuilder.io', 
  'Admin User', 
  NOW(), 
  NOW()
) ON DUPLICATE KEY UPDATE name = 'Admin User';

-- Log initialization
SELECT 'Course Builder database initialized' as status;