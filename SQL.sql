CREATE TABLE member
(
    dog_tag_name char(8) PRIMARY KEY,
    user_pw varchar(20) NOT NULL,
    rank varchar(10) NOT NULL,
    class char(2) NOT NULL,
    name char(3) NOT NULL,
    sign_in_date DATE NOT NUL DEFAULT(current_date)
);

CREATE TABLE army_unit
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    dog_tag_name char(8) NOT NULL,
    operator varchar(7) NOT NULL,
    division char(5) NULL,
    brigade varchar(10) NULL,
    battalion varchar(10) NULL,
    under_battalion varchar(10) NULL,
    FOREIGN KEY(dog_tag_name) REFERENCES member(dog_tag_name)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE file
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    dog_tag_name char(8) NOT NULL,
    ext_name varchar(5) NOT NULL,
    file_location varchar(100) NOT NULL,
    updater_ip char(15) NOT NULL,
    room_id INT NOT NULL,
    create_time DATE NULL DEFAULT(current_date),
    update_time DATE NULL,
    read_time DATE NULL,
    FOREIGN KEY(dog_tag_name) REFERENCES member(dog_tag_name)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY(updater_ip) REFERENCES ip(registed_ip)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY(room_id) REFERENCES room(room_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE ip
(
    registed_ip char(15) NOT NULL PRIMARY KEY,
    dog_tag_name char(8) NOT NULL,
    user_location varchar(13) NOT NULL,
    department varchar(10) NOT NULL,
    FOREIGN KEY(dog_tag_name) REFERENCES member(dog_tag_name)
    ON UPDATE CASCADE
    ON DELETE CASCADE
    
);

CREATE TABLE room
(
    room_id INT AUTO_INCREMENT PRIMARY KEY,
    room_name varchar(30) NOT NULL UNIQUE,
    room_pw varchar(12) NULL,
    dog_tag_name char(8) NOT NULL,
    create_time DATE NULL DEFAULT(current_date),
    FOREIGN KEY(dog_tag_name) REFERENCES member(dog_tag_name)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE access_department
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    allow_department varchar(10) NOT NULL,
    room_id INT NOT NULL,
    FOREIGN KEY(room_id) REFERENCES room(room_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);