# mysql

구름 에디터 기준 설정 방식!

```sql
// goorm editor 
apt-get update
apt-get install mysql-server

// server start
service mysql start

// server stop 
service mysql stop

mysql -u root -p

// DB 생성
mysql> CREATE DATABASE database_name;

// DB 확인
mysql> show databases;
```

## mysql 문법

```sql

--
-- Table structure for table `author`
--


CREATE TABLE `author` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(20) NOT NULL,
    `profile` varchar(200) DEFAULT NULL,
    PRIMARY KEY (`id`)
);

--
-- Dumping data for table `author`
--

INSERT INTO `author` VALUES (1,'egoing','developer');
INSERT INTO `author` VALUES (2,'duru','database administrator');
INSERT INTO `author` VALUES (3,'taeho','data scientist, developer');

--
-- Table structure for table `topic`
--

CREATE TABLE `topic` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(30) NOT NULL,
    `description` text,
    `created` datetime NOT NULL,
    `author_id` int(11) DEFAULT NULL,
    PRIMARY KEY (`id`)
);

--
-- Dumping data for table `topic`
--

INSERT INTO `topic` VALUES (1,'MySQL','MySQL is...','2018-01-01 12:10:11',1);
INSERT INTO `topic` VALUES (2,'Oracle','Oracle is ...','2018-01-03 13:01:10',1);
INSERT INTO `topic` VALUES (3,'SQL Server','SQL Server is ...','2018-01-20 11:01:10',2);
INSERT INTO `topic` VALUES (4,'PostgreSQL','PostgreSQL is ...','2018-01-23 01:03:03',3);
INSERT INTO `topic` VALUES (5,'MongoDB','MongoDB is ...','2018-01-30 12:31:03',1);


--
-- Select data from table
--
select * from tableName;
```

## mysql 모듈 설치

```
npm install --save mysql
```

> **--save option**
> package.json 파일의 dependencies에 해당 모듈을 입력해서 나중에 파일을 옮겨서 새로 프로젝트를 시작할 때 모듈관리를  쉽게 해준다.

### mysql 접속이 안될 때
1.  서버의 호스트와 유저 탐색 
mysql> SELECT Host,User FROM mysql.user;

2. 새로운 사용자 추가
mysql> CREATE USER 'username'@'%' IDENTIFIED BY 'password';

3. 권한 부여하기
mysql> GRANT ALL PRIVILEGES ON database-name.* TO 'username'@'%';

4. 권한 적용하기
mysql> FLUSH PRIVILEGES;

## main.js에 mysql 모듈 적용

```js
const mysql = require('mysql');

const db = mysql.createConnection({
	host:'localhost',
	user:'hwany',
	password:'1q2w3e4r',
	database:'opentutorials',
	port:'3306'
});

db.connect();

db.query(`SELECT * FROM topic`, (err, topics) => {
	console.log(topics);
	response.writeHead(200);
	response.end("Success");
});
```

### 보안성 문제

**``db.query(`SELECT * FROM topic WHERE id=${queryData.id}`)``** 는 사용자 공격에 취약
<br>
  **``db.query(`SELECT * FROM topic WHERE id=?`,[queryData.id]);``**  로 변경 가능


### 데이터 삽입
```sql
INSERT INTO topic (title, description, created, author_id) 
	VALUES(?,?,NOW(),?)`,[post.title, post.description, 1])
```

물음표 자리에 뒤에 [] 안에 있는 값들이 순서대로 들어가며 NOW() 는 현재시각을 나타내는 mysql 함수이다.
