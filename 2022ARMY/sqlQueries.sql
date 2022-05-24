CREATE DATABASE army_2022 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE army_2022;

CREATE TABLE member
(
    dog_tag_name varchar(30) PRIMARY KEY,
    user_pw varchar(30) NOT NULL,
    rank varchar(30) NOT NULL,
    class varchar(30) NOT NULL,
    name varchar(30) NOT NULL,
    sign_up_date DATETIME NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE army_unit
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    dog_tag_name varchar(30) NOT NULL,
    operator varchar(30) NOT NULL,
    division varchar(30) NULL,
    brigade varchar(30) NULL,
    battalion varchar(30) NULL,
    department varchar(30) NOT NULL,
    FOREIGN KEY(dog_tag_name) REFERENCES member(dog_tag_name)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE ip
(
    registed_ip varchar(30) NOT NULL PRIMARY KEY,
    dog_tag_name varchar(30) NOT NULL,
    user_location varchar(30) NOT NULL,
    department varchar(30) NOT NULL,
    FOREIGN KEY(dog_tag_name) REFERENCES member(dog_tag_name)
    ON UPDATE CASCADE
    ON DELETE CASCADE
    
);

CREATE TABLE room
(
    room_id INT AUTO_INCREMENT PRIMARY KEY,
    room_name varchar(200) NOT NULL UNIQUE,
    room_pw varchar(30) NULL,
    dog_tag_name varchar(30) NOT NULL,
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(dog_tag_name) REFERENCES member(dog_tag_name)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE access_department
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    allow_department varchar(30) NOT NULL,
    room_id INT NOT NULL,
    FOREIGN KEY(room_id) REFERENCES room(room_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE file
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    dog_tag_name varchar(30) NOT NULL,
    ext_name varchar(30) NOT NULL,
    file_location varchar(100) NOT NULL,
    updater_ip varchar(30) NOT NULL,
    room_id INT NOT NULL,
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME NULL,
    read_time DATETIME NULL,
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

INSERT INTO member VALUES('20-11111', '1q2w3e4r', '통신소대장', '중위', '황읍읍', DEFAULT);
INSERT INTO member VALUES('20-22222', '1q2w3e4r', '통신부소대장', '하사', '김읍읍', DEFAULT);
INSERT INTO member VALUES('20-33333', '1q2w3e4r', '인사과장', '중위', '황읍읍', DEFAULT);
INSERT INTO member VALUES('20-44444', '1q2w3e4r', '정보과장', '대위', '신읍읍', DEFAULT);
INSERT INTO member VALUES('20-55555', '1q2w3e4r', '작전과장', '소령', '양읍읍', DEFAULT);
INSERT INTO member VALUES('20-66666', '1q2w3e4r', '군수과장', '대위', '서읍읍', DEFAULT);
INSERT INTO member VALUES('20-77777', '1q2w3e4r', '동원과장', '대위', '박읍읍', DEFAULT);
INSERT INTO member VALUES('20-88888', '1q2w3e4r', '인사담당관', '상사', '김읍읍', DEFAULT);
INSERT INTO member VALUES('20-99999', '1q2w3e4r', '인사담당관', '상사', '남읍읍', DEFAULT);
INSERT INTO member VALUES('20-00000', '1q2w3e4r', '정훈장교', '중위', '김읍읍', DEFAULT);

INSERT INTO army_unit VALUES(NULL, '20-11111', '제2작전사', '39사단', '117여단', '3대대', '통신소대');
INSERT INTO army_unit VALUES(NULL, '20-22222', '제2작전사', '39사단', '117여단', '3대대', '통신소대');
INSERT INTO army_unit VALUES(NULL, '20-33333', '제2작전사', '39사단', '117여단', '3대대', '인사과');
INSERT INTO army_unit VALUES(NULL, '20-44444', '제2작전사', '39사단', '117여단', '3대대', '정보과');
INSERT INTO army_unit VALUES(NULL, '20-55555', '제2작전사', '39사단', '117여단', '3대대', '작전과');
INSERT INTO army_unit VALUES(NULL, '20-66666', '제2작전사', '39사단', '117여단', '3대대', '군수과');
INSERT INTO army_unit VALUES(NULL, '20-77777', '제2작전사', '39사단', '117여단', '3대대', '동원과');
INSERT INTO army_unit VALUES(NULL, '20-88888', '제2작전사', '39사단', '117여단', '3대대', '인사과');
INSERT INTO army_unit VALUES(NULL, '20-99999', '제2작전사', '39사단', '117여단', '3대대', '인사과');
INSERT INTO army_unit VALUES(NULL, '20-00000', '제2작전사', '39사단', '117여단', '3대대', '공보정훈과');

INSERT INTO ip VALUES('12.34.56.78', '20-11111', '통신전산병', '통신소대');
INSERT INTO ip VALUES('12.34.56.90', '20-11111', '통신소대장', '통신소대');
INSERT INTO ip VALUES('12.34.56.12', '20-33333', '인사계원', '인사과');

INSERT INTO room VALUES(NULL, '3대대 테스트', NULL, '20-11111', DEFAULT);

INSERT INTO access_department VALUES(NULL, '통신소대', 1);

INSERT INTO file VALUES(NULL, '20-11111', 'hwp','/home','12.34.56.78', 1, DEFAULT,NULL, NULL);

SELECT * FROM member INNER JOIN army_unit ON member.dog_tag_name = army_unit.dog_tag_name;
