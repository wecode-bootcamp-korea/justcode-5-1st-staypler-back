CREATE TABLE rooms (
  id int auto_increment primary key,
  title varchar(300) not null unique,
  concept varchar(300),
  type varchar(100) not null,
  address varchar(500) not null,
  province varchar(100) not null,
  city varchar(100) not null
);