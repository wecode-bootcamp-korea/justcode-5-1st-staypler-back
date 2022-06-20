CREATE TABLE rooms_special(
  id int auto_increment primary key,
  rooms_id int not null,
  title varchar(100),
  content varchar(2000),
  image varchar(2000),
  foreign key(rooms_id) references rooms(id) on delete cascade
);