CREATE TABLE `user` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `F_NAME` varchar(30) NOT NULL,
    `L_NAME` varchar(30) NOT NULL,
    `N_NAME` varchar(30) NOT NULL,
    `EMAIL` varchar(30) NOT NULL,
    `PASSWORD` varchar(30) NOT NULL,
    `SIGN_IN_TIME` datetime NOT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO user (F_NAME, L_NAME, N_NAME, EMAIL, PASSWORD, SIGN_IN_TIME) 
	VALUES(?,?,?,?,?NOW())`,[F_NAME, L_NAME, N_NAME, EMAIL, PASSWORD, SIGN_IN_TIME]);