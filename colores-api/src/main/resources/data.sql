-- Insert Users
INSERT INTO users (id, username, password, name)
VALUES (1, 'admin', '$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6', 'Admin'),
       (2, 'user', '$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6', 'User');

-- Insert Roles
INSERT INTO roles (id, name)
VALUES (1, 'USER'),
       (2, 'ADMIN');

-- Insert user roles
INSERT INTO users_roles(user_id, role_id)
VALUES (1, 1),
       (1, 2),
       (2, 1);

-- Insert colors
INSERT INTO colors (id, name, color, pantone, period)
VALUES (1, 'Red', '#f44336', '500', 2022),
       (2, 'Pink', '#e91e63', '500', 2022),
       (3, 'Purple', '#9c27b0', '500', 2022),
       (4, 'Deep Purple', '#673ab7', '500', 2022),
       (5, 'Indigo', '#3f51b5', '500', 2022),
       (6, 'Blue', '#2196f3', '500', 2022),
       (7, 'Light Blue', '#03a9f4', '500', 2022),
       (8, 'Cyan', '#00bcd4', '500', 2022),
       (9, 'Teal', '#009688', '500', 2022),
       (10, 'Green', '#4caf50', '500', 2022),
       (11, 'Light Green', '#8bc34a', '500', 2022),
       (12, 'Lime', '#cddc39', '500', 2022),
       (13, 'Yellow', '#ffeb3b', '500', 2022),
       (14, 'Amber', '#ffc107', '500', 2022),
       (15, 'Orange', '#ff9800', '500', 2022),
       (16, 'Deep Orange', '#ff5722', '500', 2022),
       (17, 'Brown', '#795548', '500', 2022),
       (18, 'Grey', '#9e9e9e', '500', 2022),
       (19, 'Blue Gray', '#607d8b', '500', 2022);