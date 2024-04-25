CREATE TABLE accounts (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
userId INT(255),
emailId VARCHAR(255),
password VARCHAR(255),
isAdmin BOOLEAN,
isDeleted BOOLEAN,
emailVerified BOOLEAN,
login BOOLEAN,
logOut BOOLEAN
)

CREATE TABLE profile (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
userId INT(255),
firstName VARCHAR(255),
lastName VARCHAR(255),
phoneNumber VARCHAR(255),
companyName VARCHAR(255),
employeeId INT(255),
role VARCHAR(255),
isDeleted BOOLEAN
);


CREATE TABLE otp (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
emailId VARCHAR(255),
otp INT(255),
createdAt VARCHAR(255),
expiredAt VARCHAR(255)
)