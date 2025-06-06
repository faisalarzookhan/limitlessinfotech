-- Seed data for Limitless Infotech System

-- Insert admin user
INSERT INTO users (email, name, role, employee_code, password_hash, department) VALUES
('admin@limitless.com', 'System Administrator', 'admin', 'LIS000', '$2a$12$LQv3c1yqBwEHXw.9UdDrVeaM4rw4g6rJGOgHcytHx8KcCXzPdHXn.', 'Administration');

-- Insert employees
INSERT INTO users (email, name, role, employee_code, password_hash, department) VALUES
('john@limitless.com', 'John Doe', 'employee', 'LIS001', '$2a$12$LQv3c1yqBwEHXw.9UdDrVeaM4rw4g6rJGOgHcytHx8KcCXzPdHXn.', 'Development'),
('sarah@limitless.com', 'Sarah Smith', 'employee', 'LIS002', '$2a$12$LQv3c1yqBwEHXw.9UdDrVeaM4rw4g6rJGOgHcytHx8KcCXzPdHXn.', 'Design'),
('mike@limitless.com', 'Mike Johnson', 'employee', 'LIS003', '$2a$12$LQv3c1yqBwEHXw.9UdDrVeaM4rw4g6rJGOgHcytHx8KcCXzPdHXn.', 'Project Management');

-- Insert client
INSERT INTO users (email, name, role, client_id, password_hash) VALUES
('client@techcorp.com', 'TechCorp Solutions', 'client', 'CLIENT001', '$2a$12$LQv3c1yqBwEHXw.9UdDrVeaM4rw4g6rJGOgHcytHx8KcCXzPdHXn.');

-- Note: All passwords are hashed version of 'limitless2024'
-- In production, use proper password hashing and unique passwords
